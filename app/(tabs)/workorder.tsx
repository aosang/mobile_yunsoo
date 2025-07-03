import { WorkOrderProps } from '@/lib/dbtype';
import { getUserInfo, getWorkOrderData } from '@/lib/pubFunction';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { GestureHandlerRootView, RectButton, Swipeable } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabBar, TabView } from 'react-native-tab-view';
const RightActions = () => (
  <RectButton
    style={{
      backgroundColor: '#ff4d4f',
      alignItems: 'center',
      justifyContent: 'center',
      width: 60,
      height: 130
    }}
    onPress={() => Alert.alert(
      "确认删除",
      "是否确认删除该工单？",
      [{
        text: "取消",
        style: "cancel"
      }, {
        text: "确认",
        style: "destructive",
        onPress: () => {
          console.log("执行删除操作");
        }
      }]
    )}
  >
    <Text style={{ color: 'white' }}>删除</Text>
  </RectButton>
);

export default function WorkOrder() {
  const WorkOrderRoute = ({ status }: { status: string }) => {
    const swipeableRefs = useRef<Array<Swipeable | null>>([])
    
    const closeOtherRows = (index: number) => {
      requestAnimationFrame(() => {
        swipeableRefs.current.forEach((ref, i) => {
          if (i !== index && ref) {
            ref.close()
          }
        })
      })
    }

    // 根据status筛选工单
    const filteredOrders = status === '全部' ? workOrderData : workOrderData.filter(order => {
      switch (status) {
        case '已解决':
          return order.created_status === '已解决';
        case '待处理':
          return order.created_status === '待处理';
        case '处理中':
          return order.created_status === '处理中';
        default:
          return true;
      }
    });

    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        {workOrderData.length > 0 && filteredOrders.length > 0? (
          <FlatList
            onRefresh={fetchWorkOrderData}
            refreshing={isLoading}
            style={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignSelf: 'center' }}
            data={filteredOrders}
            renderItem={({ item, index }) => (
              <Swipeable
                key={item.created_id}
                ref={ref => {
                  if (ref) {
                    swipeableRefs.current[index] = ref;
                  }
                }}
                renderRightActions={RightActions}
                onSwipeableOpen={() => closeOtherRows(index)}
              >
                <TouchableOpacity
                  onPress={() => goToWorkOrderDetail(item.created_id)}
                  style={{
                    width: 380,
                    height: 130,
                    backgroundColor: 'white',
                    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
                    padding: 12,
                    position: 'relative',
                    marginBottom: 12
                }}>
                  <Text style={{ marginBottom: 8, fontWeight: 'bold', color: '#222' }}>设备名称：<Text style={{color: '#333', fontWeight: 'normal' }}>{item.created_product}</Text></Text>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Text style={{ marginRight: 12, fontWeight: 'bold', color: '#222' }}>设备类型：<Text style={{color: '#333', fontWeight: 'normal' }}>{item.created_type}</Text></Text>
                    <Text style={{ fontWeight: 'bold', color: '#222' }}>设备品牌：<Text style={{color: '#333', fontWeight: 'normal' }}>{item.created_brand}</Text></Text>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Text style={{ marginRight: 12, fontWeight: 'bold', color: '#222' }}>创建人：<Text style={{color: '#333', fontWeight: 'normal' }}>{item.created_name}</Text></Text>
                    <Text style={{ fontWeight: 'bold', color: '#222' }}>更新时间：<Text style={{color: '#333', fontWeight: 'normal' }}>{item.created_update}</Text></Text>
                  </View>
                  <Text
                    numberOfLines={1}
                    style={{ marginBottom: 8, width: 350, fontWeight: 'bold', color: '#222' }}>
                    问题描述：<Text style={{color: '#333', fontWeight: 'normal' }}>{item.created_text}</Text>
                  </Text>
                  <View style={{
                    position: 'absolute',
                    top: 10,
                    right: 12,
                    backgroundColor: {
                      '已解决': '#f6ffed',
                      '待处理': '#fff7e6',
                      '处理中': '#fff1f0'
                    }[item.created_status],
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 2,
                    paddingBottom: 2,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: {
                      '已解决': '#389e0d',
                      '待处理': '#d46b08',
                      '处理中': '#dd394a'
                    }[item.created_status]
                  }}>
                    {item.created_status === '已解决' && <Text style={{ color: '#389e0d' }}>{item.created_status}</Text>}
                    {item.created_status === '待处理' && <Text style={{ color: '#d46b08' }}>{item.created_status}</Text>}
                    {item.created_status === '处理中' && <Text style={{ color: '#dd394a' }}>{item.created_status}</Text>}
                  </View>
                </TouchableOpacity>
              </Swipeable>
            )}
          />
        ) : (
          <View style={{ marginTop: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <FontAwesome name="file-text-o" size={40} color="#555" />
            <Text style={{ fontSize: 14, color: '#555', marginTop: 6 }}>暂无工单</Text>
          </View>
        )}
      </GestureHandlerRootView>
    )
  }

  const layout = useWindowDimensions();
  const [workOrderData, setWorkOrderData] = useState<WorkOrderProps[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: '全部' },
    { key: 'second', title: '已解决' },
    { key: 'three', title: '待处理' },
    { key: 'four', title: '处理中' },
  ])

  const renderScene = ({ route }: { route: { title: string } }) => {
    return <WorkOrderRoute status={route.title} />;
  };

  const changeIndex = (index: number) => {
    setIndex(index)
  }

  const fetchWorkOrderData = async () => {
    const userInfo = await getUserInfo()
    try {
      setIsLoading(true)
      setError(null)
      const data = await getWorkOrderData(userInfo.id as string)
      if (data) {
        setWorkOrderData(data)
      } else {
        setError('获取数据失败，请重试')
      }
    } catch (err) {
      setError('系统异常，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  const goToWorkOrderDetail = (id: string) => {
    router.push({
      pathname: '/views/orderdetails',
      params: { id }
    })
  }

  useEffect(() => {
    fetchWorkOrderData()
  }, [])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>加载中...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#ff4d4f' }}>{error}</Text>
        <Text 
          style={{ marginTop: 10, color: '#2a6fff' }}
          onPress={fetchWorkOrderData}
        >
          点击重试
        </Text>
      </View>
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={['bottom', 'left', 'right']}
      >
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={changeIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={(props: any) =>
            <TabBar
              {...props}
              style={{ backgroundColor: '#2a6fff', paddingTop: 50 }}
              indicatorStyle={{ backgroundColor: '#fff' }}
              renderLabel={({ route, focused }: { route: { title: string }, focused: boolean }) => (
                <View>
                  <Text style={{
                    fontSize: 15,
                    color: focused ? '#fff' : 'rgba(255,255,255,0.6)',
                    fontWeight: focused ? 'bold' : 'normal',
                  }}>
                    {route.title}
                  </Text>
                </View>
              )}
            />}
        />
      </SafeAreaView>
      
      <TouchableOpacity style={{
        width: 52,
        height: 52,
        backgroundColor: '#2a6fff',
        position: 'absolute',
        bottom: 60,
        right: 15,
        borderRadius: 30,
        zIndex: 10,
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)'
      }}>
        <Ionicons 
          name="add" 
          size={28} 
          color="white" 
          style={{ 
            textAlign: 'center', 
            lineHeight: 52, 
            fontWeight: 'bold',
          }} />
      </TouchableOpacity>
    </GestureHandlerRootView>
  )
}