import { Tabs } from "expo-router";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faCircleUser, faHome } from '@fortawesome/free-solid-svg-icons';
import { View, Text } from 'react-native';

// Define the types for the TabIcon props
interface TabIconProps {
  icon: any; // FontAwesomeIcon type
  color: string;
  focused: boolean;
  name: string;
}

// TabIcon component with proper typing
const TabIcon: React.FC<TabIconProps> = ({ icon, color, focused, name }) => {
  return (
    <View className="items-center justify-center gap-2 mt-7">
      <FontAwesomeIcon icon={icon} size={20} color={color} />
      <Text className={`${focused ? 'font-bold text-white' : 'font-bold text-[#6e4c30]'} text-xs`} style={{ color }}>
        {name}
      </Text>
    </View>
  );
};

// Define the TabsLayout component
const TabsLayout: React.FC = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#6e4c30',
        tabBarInactiveBackgroundColor: "white",
        tabBarActiveBackgroundColor: "#6e4c30",
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: "white",
          borderTopWidth: 3,
          borderTopColor: 'red',
          minHeight: 70
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={faHome} color={color} focused={focused} name="Home" />
          )
        }}
      />
      <Tabs.Screen
        name="first"
        options={{
          headerShown: false,
          title: 'First',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={faHome} color={color} focused={focused} name="First" />
          )
        }}
      />
      <Tabs.Screen
        name="second"
        options={{
          headerShown: false,
          title: 'Second',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={faHome} color={color} focused={focused} name="Second" />
          )
        }}
      />
      <Tabs.Screen
        name="third"
        options={{
          headerShown: false,
          title: 'Third',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={faHome} color={color} focused={focused} name="Third" />
          )
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
