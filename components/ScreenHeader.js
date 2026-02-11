import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GlobalState from '../GlobalState';

const ScreenHeader = ({
                        subtitle,
                        leftLabel,
                        onLeftPress,
                        rightNode,
                      }) => {
  const {colors} = useTheme();
  const context = React.useContext(GlobalState);
  const chipText = context.isDarkMode ? '#BFD5FF' : '#2F6BFF';
  const showTopRow = Boolean(leftLabel || rightNode);
  const showSubtitle = Boolean(subtitle);

  if (!showTopRow && !showSubtitle) {
    return null;
  }

  return (
      <View style={styles.container}>
        {showTopRow && (
            <View style={styles.topRow}>
              <View style={styles.sideWrap}>
                {leftLabel ? (
                    <TouchableOpacity style={styles.leftButton}
                                      onPress={onLeftPress}>
                      <Ionicons name="chevron-back" size={15} color={chipText}/>
                      <Text style={[
                        styles.leftText,
                        {color: chipText}]}>{leftLabel}</Text>
                    </TouchableOpacity>
                ) : <View/>}
              </View>

              <View style={styles.sideWrap}>
                {rightNode || <View/>}
              </View>
            </View>
        )}

        <View style={styles.headingWrap}>
          {showSubtitle ? (
              <Text style={[
                styles.subtitle,
                {color: colors.text}]}>{subtitle}</Text>
          ) : null}
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 2,
    paddingBottom: 6,
  },
  topRow: {
    minHeight: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  sideWrap: {
    minWidth: 80,
  },
  leftButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 999,
  },
  leftText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 2,
  },
  headingWrap: {
    marginTop: 0,
  },
  subtitle: {
    marginTop: 0,
    fontSize: 12,
    opacity: 0.7,
    fontWeight: '500',
  },
});

export default ScreenHeader;
