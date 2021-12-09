module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module:react-native-dotenv",     
        {
          moduleName: "@env",
          path: ".env",
        },
      ],
    ],
  };
};
//instead of importing from 'react-native...., we can just import using @env, and
//the path will be .env

// do an expo r -c to clear the expo cache so that env file can be imported