import { useState } from 'react';
import { Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

const FirstRoute = () => {
  return (
    <View style={{ backgroundColor: '#2a6fff' }}>
      <Text style={{ color: '#fff' }}>这是 Tab 1</Text>
    </View>
  )
}

const SecondRoute = () => (
  <View style={{ backgroundColor: '#3e7dff' }}>
    <Text style={{ color: '#fff' }}>这是 Tab 2</Text>
  </View>
)

const ThirdRoute = () => (
  <View style={{ backgroundColor: '#3e7dff' }}>
    <Text style={{ color: '#fff' }}>这是 Tab 3</Text>
  </View>
)

const FouthRoute = () => (
  <View style={{ backgroundColor: '#3e7dff' }}>
    <Text style={{ color: '#fff' }}>这是 Tab 4</Text>
  </View>
)


export default function WorkOrder() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: '全部' },
    { key: 'second', title: '已完成' },
    { key: 'three', title: '未完成' },
    { key: 'four', title: '暂停中' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    three: ThirdRoute,
    four: FouthRoute
  });

  return (
    <SafeAreaView 
      style={{ flex: 1}} 
      edges={['bottom', 'left', 'right']}
    >
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={ (props: any) =>
            
            <TabBar 
              {...props} 
              style={{backgroundColor: '#2a6fff', paddingTop: 50}}
              indicatorStyle={{backgroundColor: '#fff'}}
              renderLabel={({ route, focused }: { route: { title: string }, focused: boolean }) => (
                <View> 
                  <Text style={{
                    fontSize: 15,
                    color: focused? '#fff' : 'rgba(255,255,255,0.6)',
                    fontWeight: focused ? 'bold' : 'normal',
                  }}>
                    {route.title}
                  </Text>
                </View>
              )}
          />}
          
        />
    </SafeAreaView>
  )
}