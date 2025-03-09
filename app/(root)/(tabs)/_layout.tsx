import { Tabs } from "expo-router"

const TabsLayout = () => {

    return (
        <Tabs
        screenOptions={{
            tabBarShowLabel: true,
            tabBarStyle: {
                position: 'absolute',
                backgroundColor:"white",
                borderTopWidth: 1,
                borderTopColor: 'lightgray',
                minHeight: 70
            }
        }}>

            <Tabs.Screen name="index" options={{ headerShown: false,
                title: "Home"
             }} />
            <Tabs.Screen name="first" options={{ headerShown: false,
                title: 'First'
             }} />
            <Tabs.Screen name="second" options={{ headerShown: false,
                title: 'Second'
             }} />
              <Tabs.Screen name="third" options={{ headerShown: false,
                title: 'Third'
             }} />

        </Tabs>
    )
}

export default TabsLayout;