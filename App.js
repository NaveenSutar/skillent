import 'react-native-gesture-handler';

import { LogBox, StatusBar } from 'react-native';

import Applied from './src/screens/Applied';
import Assigned from './src/screens/Assigned';
import Calender from './src/screens/Calender';
import ChangePassword from './src/screens/ChangePassword';
import Chats from './src/screens/Chats';
import Dashboard from './src/screens/DashBoard';
import Education from './src/screens/Education';
import Employee from './src/screens/Employee';
import ForgotPassword from './src/screens/ForgotPassword';
import GuestJobDetails from './src/screens/GuestJobDetails';
import GuestJobs from './src/screens/GuestJobs';
import Icon from './src/components/Icon';
import JobDetails from './src/screens/JobDetails';
import MapsView from './src/screens/MapsView';
import Messages from './src/screens/Messages';
import More from './src/screens/More';
import { NavigationContainer } from '@react-navigation/native';
import Notifications from './src/screens/Notifications';
import OfflineNotice from './src/components/OfflineNotice';
import Onboard from './src/screens/Onboard';
import Personal from './src/screens/Personal';
import Profile from './src/screens/Profile';
import React from 'react';
import Recommended from './src/screens/Recommended';
import Saved from './src/screens/Saved';
import Search from './src/screens/Search';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Splash from './src/screens/Splash';
import Terms from './src/screens/Terms';
import WorkExperience from './src/screens/WorkExperience';
import colours from './assets/colours';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

LogBox.ignoreAllLogs();

const AuthStack = createNativeStackNavigator();
const TabNav = createBottomTabNavigator();


const SaveTabStack = createNativeStackNavigator();
const SearchTabStack = createNativeStackNavigator();
const DashboardTabStack = createNativeStackNavigator();
const MessagesTabStack = createNativeStackNavigator();
const MoreTabStack = createNativeStackNavigator();

const SaveTab = () => {
  return (
    <SaveTabStack.Navigator detachPreviousScreen={true} initialRouteName="Saved">
      <SaveTabStack.Screen name="Saved" component={Saved} options={{ headerShown: false, gestureEnabled: false }} />
      <SearchTabStack.Screen name="MapsView" component={MapsView} options={{ headerShown: false }} />
      <SaveTabStack.Screen name="JobDetails" component={JobDetails} gestureEnabled={false} options={{ headerShown: false, gestureEnabled: false }} />
    </SaveTabStack.Navigator>
  );
};

const SearchTab = () => {
  return (
    <SearchTabStack.Navigator initialRouteName="Search">
      <SearchTabStack.Screen name="Search" component={Search} options={{ headerShown: false }} />
      <SearchTabStack.Screen name="MapsView" component={MapsView} options={{ headerShown: false }} />
      <SearchTabStack.Screen name="JobDetails" component={JobDetails} options={{ headerShown: false }} />
    </SearchTabStack.Navigator>
  );
};

const DashboardTab = () => {
  return (
    <DashboardTabStack.Navigator detachPreviousScreen={true} initialRouteName="DashBoard">
      <DashboardTabStack.Screen name="DashBoard" component={Dashboard} options={{ headerShown: false }} />
      <SearchTabStack.Screen name="MapsView" component={MapsView} options={{ headerShown: false }} />
      <DashboardTabStack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
      <DashboardTabStack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <DashboardTabStack.Screen name="Personal" component={Personal} options={{ headerShown: false }} />
      <DashboardTabStack.Screen name="Education" component={Education} options={{ headerShown: false }} />
      <DashboardTabStack.Screen name="WorkExperience" component={WorkExperience} options={{ headerShown: false }} />
      <DashboardTabStack.Screen name="Employee" component={Employee} options={{ headerShown: false }} />
      <DashboardTabStack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
      <DashboardTabStack.Screen name="Applied" component={Applied} options={{ headerShown: false }} />
      <DashboardTabStack.Screen name="Assigned" component={Assigned} options={{ headerShown: false }} />
      <DashboardTabStack.Screen name="Recommended" component={Recommended} options={{ headerShown: false }} />
      <DashboardTabStack.Screen name="JobDetails" component={JobDetails} options={{ headerShown: false }} />
    </DashboardTabStack.Navigator>
  );
};

const MessagesTab = () => {
  return (
    <MessagesTabStack.Navigator detachPreviousScreen={true} initialRouteName="Messages">
      <MessagesTabStack.Screen name="Messages" component={Messages} options={{ headerShown: false, gestureEnabled: false }} />
      <MessagesTabStack.Screen name="Chats" component={Chats} options={{ headerShown: false }} />
    </MessagesTabStack.Navigator>
  );
};

const MoreTab = () => {
  return (
    <MoreTabStack.Navigator detachPreviousScreen={true} initialRouteName="More">
      <MoreTabStack.Screen name="More" component={More} options={{ headerShown: false, gestureEnabled: false }} />
      <MoreTabStack.Screen name="Calender" component={Calender} options={{ headerShown: false, gestureEnabled: true }} />
    </MoreTabStack.Navigator>
  );
};

const Tab = () => {
  return (
    <TabNav.Navigator
      detachPreviousScreen={true}
      tabBarOptions={{
        tabBarItemStyle: { borderColor: colours.skilent_primary, borderWidth: 1 },
        activeTintColor: colours.skilent_primary,
        inactiveTintColor: colours.skilent_textSecondary,
        // showLabel: false,
        backBehavior: 'initialRoute',
      }}

      initialRouteName="DashBoard"

      screenOptions={({ route, focused }) => ({
        tabBarStyle: { borderTopColor: colours.skilent_primary, borderTopWidth: 0.5 },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Saved') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'briefcase-search' : 'briefcase-search-outline';
          } else if (route.name === 'DashBoard') {
            iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'message-processing' : 'message-processing-outline';
          } else if (route.name === 'More') {
            iconName = focused ? 'dots-horizontal-circle' : 'dots-horizontal-circle-outline';
          }

          return <Icon type="IonIcon" name={iconName} size={size} color={color} /> && <Icon type="MatComIcon" name={iconName} size={size} color={color} />;
        },

      })}>

      <TabNav.Screen
        name="Saved"
        component={SaveTab}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          gestureEnabled: false,
        }}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })} />

      <TabNav.Screen
        name="Search"
        component={SearchTab}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          gestureEnabled: false
        }}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
      />

      <TabNav.Screen
        name="DashBoard"
        component={DashboardTab}
        options={{
          headerShown: false,
          gestureEnabled: false,
          unmountOnBlur: true
        }} />

      <TabNav.Screen
        name="Messages"
        component={MessagesTab}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          gestureEnabled: false
        }}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })} />

      <TabNav.Screen
        name="More"
        component={MoreTab}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          gestureEnabled: false
        }}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })} />

    </TabNav.Navigator>
  );
}

const App = () => {
  return (

    <NavigationContainer>
      <StatusBar barStyle='dark-content' backgroundColor={colours.skilent_lightBackground} />
      <OfflineNotice />
      <AuthStack.Navigator detachPreviousScreen={true} initialRouteName="Splash">
        <AuthStack.Screen name="Splash" component={Splash} options={{ headerShown: false, gestureEnabled: false }} />
        <AuthStack.Screen name="Onboard" component={Onboard} options={{ headerShown: false, gestureEnabled: false }} />
        <AuthStack.Screen name="GuestJobs" component={GuestJobs} options={{ headerShown: false }} />
        <AuthStack.Screen name="GuestJobDetails" component={GuestJobDetails} options={{ headerShown: false }} />
        <AuthStack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <AuthStack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        <AuthStack.Screen name="Terms" component={Terms} options={{ headerShown: false, gestureEnabled: false }} />

        <AuthStack.Screen name="Tab" component={Tab} options={{ headerShown: false, gestureEnabled: false }} />
      </AuthStack.Navigator>
    </NavigationContainer>

  );
};

export default App;

{/* <ScrollView contentInsetAdjustmentBehavior="automatic"> */ }
{/* </ScrollView> */ }