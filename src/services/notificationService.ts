import { Alert } from 'react-native'

export class NotificationService {
  public static Message(title: string, description: string) {
    Alert.alert(title, description)
  }
}
