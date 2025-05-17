import { Tabs } from "expo-router";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faCircleUser, faHome, faRobot,faMapMarkedAlt, faLightbulb } from '@fortawesome/free-solid-svg-icons';
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
    <View className="items-center justify-center gap-2 mt-7" style={{ width: 80 }}>
      <FontAwesomeIcon icon={icon} size={20} color={color} />
      <Text className={`${focused ? 'font-bold text-white' : 'font-bold text-[#6e4c30]'} text-xs`} style={{ color }} >
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
            name="furBot"
            options={{
                headerShown: false,
                title: 'FurBot',
                tabBarIcon: ({ color, focused }) => (
                <TabIcon
                    icon={faRobot}
                    color={color}
                    focused={focused}
                    name="Fur Bot" 
                />
                ),
            }}
        />

      <Tabs.Screen
            name="findVet"
            options={{
                headerShown: false,
                title: 'FindVet',
                tabBarIcon: ({ color, focused }) => (
                <TabIcon
                    icon={faMapMarkedAlt}
                    color={color}
                    focused={focused}
                    name="Find Vet" 
                />
                ),
            }}
        />
      <Tabs.Screen
            name="tips"
            options={{
                headerShown: false,
                title: 'Tips',
                tabBarIcon: ({ color, focused }) => (
                <TabIcon
                    icon={faLightbulb}
                    color={color}
                    focused={focused}
                    name="Tips" 
                />
                ),
            }}
        />
    </Tabs>
  );
};

export default TabsLayout;
