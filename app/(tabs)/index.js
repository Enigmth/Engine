import {useTheme} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import {router} from 'expo-router';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EngineSafeAreaView from '../../components/EngineSafeAreaView';
import ScreenHeader from '../../components/ScreenHeader';
import PageLoading from '../../components/Spinner';
import AsyncStorageItems from '../../constants/async-storage/AsyncStorageItems';
import {getMechanics} from '../../constants/Mechanical_engineers';
import GlobalState from '../../GlobalState';
import {
  getAsyncStorage,
  setAsyncStorage,
} from '../../services/AsyncStorageServiceImpl';
import DimensionServiceImpl from '../../services/DimensionServiceImpl';
import GeolibServiceImpl from '../../services/GeolibServiceImpl';
import MechanicServiceImpl from '../../services/mechanic/MechanicServiceImpl';
import Translate from '../../Translate';

const height = DimensionServiceImpl.getHeight();

const Call = () => {
  const context = React.useContext(GlobalState);
  const [mechanics, setMechanics] = useState(getMechanics());
  const [loading, setLoading] = useState(false);
  const {colors, dark} = useTheme();
  const isLight = !dark;

  useFocusEffect(
      React.useCallback(() => {
        context.setSearchSourceTab?.('index');
      }, [context]),
  );

  const getByCity = city => {
    setLoading(true);
    MechanicServiceImpl.get(city).then(res => {
      const data = res.data;
      filterByLocation(data);
      setAsyncStorage(AsyncStorageItems.Mechanics, JSON.stringify(res.data));
    }).catch((e) => {
      console.log(e);
      getAsyncStorage(AsyncStorageItems.Mechanics).then(localMechanics => {
        const data = localMechanics ? localMechanics : getMechanics();
        filterByLocation(data);
      });
    }).finally(() => {
      setLoading(false);
    });
  };

  const filterByLocation = data => {
    const nonLocationMechanics = data.filter(m => !m.latitude);
    let byDistance = data.filter(m => m.latitude);
    if (context.location) {
      byDistance = GeolibServiceImpl.orderByDistance(context.location,
          byDistance);
    }
    setMechanics([...byDistance, ...nonLocationMechanics]);
  };

  const renderItem = ({item}) => (
      <TouchableOpacity
          onPress={() => router.navigate({
            pathname: 'Details',
            params: {
              ...item,
            },
          })}
          style={[
            styles.card,
            {
              backgroundColor: colors.background,
              borderColor: isLight ? '#E8EDF8' : 'transparent',
              borderWidth: isLight ? 1 : 0,
              shadowOpacity: isLight ? 0.14 : 0.08,
              shadowRadius: isLight ? 18 : 12,
              elevation: isLight ? 6 : 3,
            },
          ]}>
        <View style={styles.cardBody}>
          <View style={[
            styles.badge,
            {backgroundColor: context.isDarkMode ? '#2F3540' : '#EAF2FF'},
          ]}>
            <MaterialIcons
                name={'build-circle'}
                color={context.isDarkMode ? '#7CB0FF' : '#2E6BFF'}
                size={16}
            />
            <Text style={[
              styles.badgeText,
              {color: context.isDarkMode ? '#BFD6FF' : '#2E6BFF'},
            ]}>
              Garage
            </Text>
          </View>
          <Text
              style={[styles.nameText, {color: colors.text}]}
              numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text
              style={[styles.cityText, {color: colors.text}]}
              numberOfLines={1}
          >
            {item.city}
          </Text>
          <Text
              style={[styles.addressText, {color: colors.text}]}
              numberOfLines={2}
          >
            {item.address}
          </Text>
        </View>
        <View style={styles.chevronWrap}>
          <MaterialIcons
              name={'keyboard-arrow-right'}
              color={context.isDarkMode ? '#A3AEC2' : '#7A859A'}
              size={24}
          />
        </View>
      </TouchableOpacity>
  );

  return loading ? <PageLoading message={Translate.t('FetchingData')}/> : (
      <EngineSafeAreaView
          style={[styles.container, {backgroundColor: colors.background}]}>
        <ScreenHeader
            title="Mechanics"
        />

        <FlashList
            estimatedItemSize={20}
            data={mechanics}
            contentContainerStyle={styles.listContent}
            keyExtractor={i => i.name + i.address}
            renderItem={renderItem}
            ListEmptyComponent={() => (
                <View style={[styles.emptyWrap, {height: height - 180}]}>
                  <MaterialIcons
                      name="search-off"
                      size={30}
                      color={context.isDarkMode ? '#8C95A8' : '#96A0B5'}
                  />
                  <Text style={[styles.emptyText, {color: colors.text}]}>
                    {Translate.t('NoDataFound')}
                  </Text>
                </View>
            )}
        />
      </EngineSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 14,
    paddingTop: 4,
    paddingBottom: 80,
  },
  card: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#111827',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  cardBody: {
    flex: 1,
    paddingRight: 10,
  },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 4,
    letterSpacing: 0.2,
  },
  nameText: {
    fontSize: 17,
    fontWeight: '700',
  },
  cityText: {
    fontSize: 13,
    marginTop: 4,
    opacity: 0.88,
    fontWeight: '600',
  },
  addressText: {
    fontSize: 13,
    marginTop: 4,
    opacity: 0.72,
    lineHeight: 18,
  },
  chevronWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Call;
