import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Home from "./screens/Home/Home";
import UserProfile from "./screens/UserProfile/UserProfile.tsx";
import Services from "./screens/Servicess/services";
import Adoptation from "./screens/Adoptation/Adoptation";
import ChatContainer from "./screens/ChatContainer/ChatContainer";
import ChatPage from "./screens/ChatPage/ChatPage";
import TrainingList from "./screens/Training/TrainingList";
import store from "./lib/redux/store";
import Comment from "./screens/Training/Comments";
import Map from "./screens/MapForUser/Map";
import Events from "./screens/Events/Events";
import { Provider } from "react-redux";
import EditProfile from "./screens/UserProfile/EditProfile";
import Blogs from "./screens/Blogs/Blogs";
import Video from "./screens/Home/Components/TestVideo";
import Videos from "./screens/Home/Components/TestVideos";
import Translator from "./screens/Translator/Translator";
import ChatBot from "./screens/ChatBot/ChatBot";
import CommunityPage from "./screens/Community/Community";
import OffLine from "./screens/CoursOffLine/CoursOffLine";
import QuranCours from "./screens/Quran/QuranCours";
import ChatList from "./screens/ChatList/ChatList";
import VideoRecord from "./screens/VideoRecord/VideoRecord";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="QuranCours"
            component={QuranCours}
            options={{
              title: "QuranCours",
              headerStyle: {
                backgroundColor: "#4e9d91",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="OffLine"
            component={OffLine}
            options={{
              title: "Cours en Ligne",
              headerStyle: {
                backgroundColor: "#4e9d91",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Translator"
            component={Translator}
            options={{
              title: "Translator",
              headerStyle: {
                backgroundColor: "#4e9d91",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Community"
            component={CommunityPage}
            options={{
              title: "Community",
              headerStyle: {
                backgroundColor: "#4e9d91",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="ChatList"
            component={ChatList}
            options={{
              title: "ChatList",
              headerStyle: {
                backgroundColor: "#4e9d91",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="ChatBot"
            component={ChatBot}
            options={{
              title: "Chat Bot",
              headerStyle: {
                backgroundColor: "#4e9d91",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Video"
            component={Video}
            options={{
              title: "Video",
              headerStyle: {
                backgroundColor: "#4e9d91",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Videos"
            component={Videos}
            options={{
              title: "Videos",
              headerStyle: {
                backgroundColor: "#4e9d91",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Blogs"
            component={Blogs}
            options={{
              title: "Blogs",
              headerStyle: {
                backgroundColor: "#4e9d91",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />

          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={{
              title: "Profile",
              headerStyle: {
                backgroundColor: "#4e9d91",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />

          <Stack.Screen
            name="Services"
            component={Services}
            options={{
              title: "Services",
              headerStyle: {
                backgroundColor: "#4e9d91",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Cours"
            component={Adoptation}
            options={{
              headerShown: true,

              title: "Cours",
              headerStyle: {
                backgroundColor: "#4e9d91",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="comment"
            component={Comment}
            options={{
              headerShown: true,

              title: "Comment",
              headerStyle: {
                backgroundColor: "#4e9d91",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Events"
            component={Events}
            options={{
              title: "Events",
              headerStyle: {
                backgroundColor: "#4e9d91",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />

          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              title: "Edit Profile",
              headerStyle: {
                backgroundColor: "#4e9d91",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />

          <Stack.Screen
            name="ChatContainer"
            component={ChatContainer}
            options={{
              title: "Chat",
              headerStyle: {
                backgroundColor: "#4e9d91",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerBackVisible: false,
            }}
          />
          <Stack.Screen name="ChatPage" component={ChatPage} />
          <Stack.Screen
            name="Training"
            component={TrainingList}
            options={{
              title: "Formation",
              headerStyle: {
                backgroundColor: "#4e9d91",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        </Stack.Navigator>
        {/* <Navbar/> */}
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff4",
    alignItems: "center",
    justifyContent: "center",
  },
});
