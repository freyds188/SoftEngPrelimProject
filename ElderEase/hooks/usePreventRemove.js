   // hooks/usePreventRemove.js
   import { useEffect } from 'react';
   import { useNavigation } from '@react-navigation/native';

   const usePreventRemove = () => {
       const navigation = useNavigation();

       useEffect(() => {
           const unsubscribe = navigation.addListener('beforeRemove', (e) => {
               // Prevent default behavior of leaving the screen
               e.preventDefault();
           });

           return unsubscribe;
       }, [navigation]);
   };

   export default usePreventRemove;