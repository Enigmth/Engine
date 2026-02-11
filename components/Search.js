import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GlobalState from '../GlobalState';

const Search = props => {
  const {colors} = useTheme();
  const context = React.useContext(GlobalState);
  const inputRef = React.useRef(null);
  const [isActive, setIsActive] = React.useState(
      Boolean(props.value) || Boolean(props.autoActivate),
  );
  const isDark = context?.isDarkMode;
  const shellColor = isDark ? '#1D222D' : '#FFFFFF';
  const borderColor = isDark ? '#2F3A4D' : '#DCE4F2';
  const placeholderColor = isDark ? '#8C98AE' : '#8E97AA';
  const iconColor = isDark ? '#95A2B9' : '#7F8BA1';
  const cancelColor = isDark ? '#9BB7FF' : '#0A84FF';

  React.useEffect(() => {
    if (Platform.OS === 'android' &&
        UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  React.useEffect(() => {
    if (props.value && !isActive) {
      setIsActive(true);
    }
  }, [props.value, isActive]);

  React.useEffect(() => {
    if (props.autoActivate && !isActive) {
      setIsActive(true);
    }
  }, [props.autoActivate, isActive]);

  React.useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        inputRef.current?.focus?.();
      }, 30);
    }
  }, [isActive]);

  const activate = () => {
    LayoutAnimation.easeInEaseOut();
    setIsActive(true);
  };

  const cancel = () => {
    LayoutAnimation.easeInEaseOut();
    setIsActive(false);
    inputRef.current?.blur?.();
    if (props.value) {
      props.onChangeText?.('');
    }
    props.onBlur?.();
  };

  const attachRef = ref => {
    inputRef.current = ref;
    if (typeof props.searchRef === 'function') {
      props.searchRef(ref);
    } else if (props.searchRef) {
      props.searchRef.current = ref;
    }
  };

  return (
      <View style={[
        styles.container,
        props.containerStyle,
        isActive && styles.containerActive]}>
        <TouchableOpacity
            activeOpacity={1}
            onPress={activate}
            style={[
              styles.shell,
              {
                backgroundColor: shellColor,
                borderColor: borderColor,
              },
            ]}>
          <Ionicons name="search" size={16} color={iconColor}/>
          <TextInput
              style={[
                styles.input,
                {color: colors.text},
                props.textInputStyle,
              ]}
              value={props.value}
              ref={attachRef}
              editable={isActive}
              clearButtonMode={props.clearButtonMode || 'while-editing'}
              placeholder={props.placeholder}
              onChangeText={text => props.onChangeText(text)}
              onFocus={props.onFocus}
              onBlur={props.onBlur}
              placeholderTextColor={placeholderColor}
              returnKeyType="search"
          >
          </TextInput>
        </TouchableOpacity>
        {isActive && (
            <TouchableOpacity onPress={cancel} style={styles.cancelButton}>
              <Text style={[
                styles.cancelText,
                {color: cancelColor}]}>Cancel</Text>
            </TouchableOpacity>
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerActive: {},
  shell: {
    height: 42,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    shadowColor: '#111827',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 42,
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: 0,
  },
  cancelButton: {
    marginLeft: 8,
    paddingHorizontal: 2,
    paddingVertical: 6,
  },
  cancelText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default Search;
