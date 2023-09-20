import { View } from 'react-native';
import { auth } from '../../firebase';
import SavedCards from '../../components/saved/SavedCards';

export default function SavedDestinations() {
  if (!auth.currentUser) {
    return <Redirect href="/login" />;
  }

  return (
    <View>
   <SavedCards />
    </View>
  );
}
