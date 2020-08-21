import AsyncStorage from '@react-native-community/async-storage';

async function setItem (key, value){
    try{
        if(!key || !value){
            return "invalid value or key";
        }

        await AsyncStorage.setItem(key, value);

        return "success";
        
    }catch(err){
        console.log(err);
        return "error";
    }
}

async function setObjectItem (key, value)  {
    try {     
      
      const jsonValue = JSON.stringify(value);
     
      const store = await AsyncStorage.setItem(key, jsonValue);
      
      return store;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

async function getItem (key){
    try {
        if(!key){
            return "Invalid";
        }
        return await AsyncStorage.getItem(key);
        
    } catch (err) {
        console.log(err);
        return "error";
    }
}


async function getObjectItem (key)  {
    try {

      const jsonValue = await AsyncStorage.getItem(key);       
     
      return jsonValue === null ? null : JSON.parse(jsonValue);      

    } catch(e) {
      console.log(e);
      return e;
    }
  }

export{
    getItem,
    getObjectItem,
    setItem,
    setObjectItem
};