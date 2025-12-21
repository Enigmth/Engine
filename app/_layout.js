import {Stack} from 'expo-router';
import React from 'react';
import Provider from '../Provider';

export default function _layout() {
  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{
          headerShown: false,
        }}/>
        <Stack.Screen name="Details"
                      options={{
                        headerShown: false,
                        // presentation: 'modal',
                        presentation: 'formSheet',
                        gestureDirection: 'vertical',
                        animation: 'slide_from_bottom',
                        sheetGrabberVisible: true,
                        sheetInitialDetentIndex: 1,
                        sheetAllowedDetents: [0.6, .8],
                      }}/>
      </Stack>

  );
};

