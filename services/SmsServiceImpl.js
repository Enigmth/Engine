import * as SMS from 'expo-sms'
import React from 'react'

const SmsServiceImpl = {
  isAvailable () {
    return SMS.isAvailableAsync()
  },
  sendSMS (number, message) {
    return SMS.sendSMSAsync(
      [number],
      message.toString(),
    )
  },
  async sendMessage (number, message) {
    let isAvailable = await this.isAvailable()
    if (isAvailable) {
      try {
        await this.sendSMS(
          number,
          message.toString(),
        )
      } catch (e) {}
    }
  },
}

export default SmsServiceImpl
