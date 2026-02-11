import {useTheme} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import {router} from 'expo-router';
import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ScreenHeader from '../../components/ScreenHeader';
import Search from '../../components/Search';
import EngineSafeAreaView from '../../components/EngineSafeAreaView';
import {getMechanics} from '../../constants/Mechanical_engineers';
import {carLights} from '../../constants/CarLights';
import {CarLightsAl} from '../../constants/CarLightsAl';
import {CarLightsMk} from '../../constants/CarLightsMk';
import GlobalState from '../../GlobalState';

const SearchScreen = () => {
  const {colors} = useTheme();
  const context = React.useContext(GlobalState);
  const [query, setQuery] = useState('');
  const sourceTab = context.searchSourceTab || 'index';
  const activeScope = sourceTab === 'Home' ? 'lights' : 'mechanics';

  const lights = useMemo(() => {
    switch (context.language) {
      case 'al':
        return CarLightsAl;
      case 'mk':
        return CarLightsMk;
      case 'en':
      default:
        return carLights;
    }
  }, [context.language]);

  const mechanics = useMemo(() => getMechanics(), []);
  const q = query.trim().toUpperCase();

  const lightResults = useMemo(
      () => lights.filter(item => !q || item.name.toUpperCase().includes(q)),
      [lights, q],
  );

  const mechanicResults = useMemo(
      () => mechanics.filter(item =>
          !q || item.name.toUpperCase().includes(q) ||
          item.city?.toUpperCase().includes(q)),
      [mechanics, q],
  );

  const data = useMemo(() => {
    if (activeScope === 'lights') {
      return lightResults.map(item => ({type: 'light', item}));
    }
    if (activeScope === 'mechanics') {
      return mechanicResults.map(item => ({type: 'mechanic', item}));
    }
    return [
      ...mechanicResults.map(item => ({type: 'mechanic', item})),
      ...lightResults.map(item => ({type: 'light', item})),
    ];
  }, [activeScope, lightResults, mechanicResults]);

  const renderItem = ({item}) => {
    if (item.type === 'mechanic') {
      return (
          <TouchableOpacity
              style={[styles.card, {backgroundColor: colors.card}]}
              onPress={() => router.navigate({
                pathname: 'Details',
                params: {
                  ...item.item,
                },
              })}>
            <View style={styles.cardLeft}>
              <Text style={[styles.cardTitle, {color: colors.text}]}>
                {item.item.name}
              </Text>
              <Text style={[styles.cardSub, {color: colors.text}]}>
                {item.item.city} - {item.item.address}
              </Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={22}
                           color={colors.text}/>
          </TouchableOpacity>
      );
    }

    return (
        <View style={[styles.card, {backgroundColor: colors.card}]}>
          <View style={styles.cardLeft}>
            <Text style={[styles.cardTitle, {color: colors.text}]}>
              {item.item.name}
            </Text>
            <Text style={[styles.cardSub, {color: colors.text}]}
                  numberOfLines={2}>
              {item.item.solution || item.item.description}
            </Text>
          </View>
        </View>
    );
  };

  return (
      <EngineSafeAreaView
          style={[styles.container, {backgroundColor: colors.background}]}>
        <ScreenHeader
            title="Search"
        />

        <View style={styles.searchWrap}>
          <Search
              value={query}
              autoActivate
              placeholder="Search"
              onChangeText={setQuery}
          />
        </View>

        <View style={styles.scopeWrap}>
          <View style={[styles.scopeButton, {backgroundColor: '#0A84FF'}]}>
            <Text style={[styles.scopeText, {color: '#fff'}]}>
              {activeScope === 'lights' ? 'Engine Lights' : 'Mechanics'}
            </Text>
          </View>
        </View>

        <FlashList
            estimatedItemSize={66}
            data={data}
            contentContainerStyle={styles.list}
            keyExtractor={(row, idx) => `${row.type}-${row.item.name}-${idx}`}
            renderItem={renderItem}
            ListEmptyComponent={
              <View style={styles.empty}>
                <Text style={{color: colors.text}}>No results</Text>
              </View>
            }
        />
      </EngineSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchWrap: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  scopeWrap: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  scopeButton: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  scopeText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 80,
  },
  card: {
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLeft: {
    flex: 1,
    paddingRight: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  cardSub: {
    fontSize: 12,
    marginTop: 3,
    opacity: 0.75,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

export default SearchScreen;
