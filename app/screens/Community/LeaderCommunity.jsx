import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../../components/Config/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDocs, collection, updateDoc, arrayUnion, arrayRemove, getDoc, addDoc } from 'firebase/firestore';
import { styles } from './CommunityStyle/ViewStyle';
import { useIsFocused } from '@react-navigation/native';

export const LeaderView = () => {
  const [communities, setCommunities] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCommunities, setFilteredCommunities] = useState([]);
  const [uid, setUid] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [newCommunityName, setNewCommunityName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        const uid = user.uid;
        setUid(uid);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    const communitiesRef = collection(db, "Communities");
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(communitiesRef);
        const communitiesData = [];
        querySnapshot.forEach((doc) => {
          communitiesData.push({ ...doc.data(), id: doc.id });
        });
        setCommunities(communitiesData);
        setFilteredCommunities(communitiesData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    fetchData();
  }, [useIsFocused()]);

  const handleSearch = (text) => {
    setSearch(text);
    const filteredCommunities = communities.filter(community => {
      return community.name.toLowerCase().includes(text.toLowerCase().replace("\n", "").trim());
    });
    setFilteredCommunities(filteredCommunities);
  };

  const joinCommunity = async (id) => {
    try {
      const userRef = doc(db, "users", uid);
      const communityRef = doc(db, "Communities", id);

      setFilteredCommunities((prevCommunities) =>
        prevCommunities.map((community) =>
          community.id === id
            ? { ...community, members: [...community.members, uid] }
            : community
        )
      );

      await updateDoc(userRef, {
        communities: arrayUnion(id),
      });

      await updateDoc(communityRef, {
        members: arrayUnion(uid),
      });

      console.log(`User ${uid} successfully added to community ${id}`);
    } catch (error) {
      console.error("Error adding user to community: ", error);
    }
  };

  const leaveCommunity = async (id) => {
    try {
      const userRef = doc(db, "users", uid);
      const communityRef = doc(db, "Communities", id);

      setFilteredCommunities((prevCommunities) =>
        prevCommunities.map((community) =>
          community.id === id
            ? { ...community, members: community.members.filter(member => member !== uid) }
            : community
        )
      );

      await updateDoc(userRef, {
        communities: arrayRemove(id),
      });

      await updateDoc(communityRef, {
        members: arrayRemove(uid),
      });
      console.log(`User ${uid} successfully removed from community ${id}`);
    } catch (error) {
      console.error("Error removing user from community: ", error);
    }
  };

  const handleJoinLeave = async (id) => {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    const userCommunities = userData.communities;
    if (userCommunities.includes(id)) {
      await leaveCommunity(id);
    } else {
      await joinCommunity(id);
    }
  };

  const handleCreateCommunity = async () => {
    if (newCommunityName.trim()) {
      try {
        const communityRef = collection(db, "Communities");
        const newCommunity = {
          name: newCommunityName,
          members: [],
          createdAt: new Date(),
        };
        const docRef = await addDoc(communityRef, newCommunity);
        console.log("Community created with ID: ", docRef.id);

        const postsRef = collection(db, "Communities", docRef.id, "Posts");
        await addDoc(postsRef, {});

        const chatRef = collection(db, "Communities", docRef.id, "chat");
        await addDoc(chatRef, {});

        setCommunities((prevCommunities) => [
          ...prevCommunities,
          { ...newCommunity, id: docRef.id },
        ]);
        setFilteredCommunities((prevCommunities) => [
          ...prevCommunities,
          { ...newCommunity, id: docRef.id },
        ]);
        setNewCommunityName('');
        setIsExpanded(false);
      } catch (error) {
        console.error("Error creating community: ", error);
      }
    } else {
      alert("Community name cannot be empty");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredCommunities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.communityCard}>
            <Text style={styles.communityName}>{item.name}</Text>
            <Button
              style={styles.button}
              title={item.members?.includes(uid) ? "Leave" : "Join"}
              onPress={() => handleJoinLeave(item.id)}
            />
          </View>
        )}
      />
      <View style={styles.createCommunityContainer}>
        <Button
          title={isExpanded ? "Cancel" : "Create New Community"}
          onPress={() => setIsExpanded(!isExpanded)}
        />
        {isExpanded && (
          <View style={styles.centeredView}>
            <TextInput
              style={styles.input}
              placeholder="Enter community name"
              value={newCommunityName}
              onChangeText={setNewCommunityName}
            />
            <Button title="Create Community" onPress={handleCreateCommunity} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
