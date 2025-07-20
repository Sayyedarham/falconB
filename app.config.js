import "dotenv/config";

export default {
  expo: {
    name: "Falcon Capital",
    slug: "thefalconuniversity",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/iconn.jpg",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true
    },
    web: {
      bundler: "metro",
      output: "single",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      "expo-font",
      "expo-web-browser"
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: "b0bbc396-e3f8-4418-a821-3e6bfccdcd4d"
      },
      supabaseUrl: process.env.EXPO_SUPABASE_URL,
      supabaseKey: process.env.EXPO_SUPABASE_ANON
    },
    android: {
      permissions: ["INTERNET"],
      package: "com.ck34.thefalconuniversity",
      jsEngine: "jsc"
    }
  }
}
