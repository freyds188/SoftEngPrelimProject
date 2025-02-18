import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AboutDevTeamScreen = () => {
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>About the Development Team</Text>
            <Text style={styles.subtitle}>Meet the team behind ElderEase:</Text>

            {/* Team Member 1 */}
            <View style={styles.teamMember}>
                <Image
                    source={require('../assets/images/charles.png')} 
                    style={styles.teamMemberImage}
                />
                <Text style={styles.teamMemberName}>Charles Andrei M. Octaviano</Text>
                <Text style={styles.teamMemberRole}>Lead Developer</Text>
                <Text style={styles.teamMemberBio}>
                  
                </Text>
            </View>

            {/* Team Member 2 */}
            <View style={styles.teamMember}>
                <Image
                    source={require('../assets/images/lustre.jpg')} 
                    style={styles.teamMemberImage}
                />
                <Text style={styles.teamMemberName}>Alexandra Neriz E. Lustre</Text>
                <Text style={styles.teamMemberRole}>UI/UX Designer</Text>
                <Text style={styles.teamMemberBio}>
                   
                </Text>
            </View>

            {/* Team Member 3 */}
            <View style={styles.teamMember}>
                <Image
                    source={require('../assets/images/frades.jpg')} 
                    style={styles.teamMemberImage}
                />
                <Text style={styles.teamMemberName}>Aldrin D. Frades</Text>
                <Text style={styles.teamMemberRole}>Backend/Frontend Developer</Text>
                <Text style={styles.teamMemberBio}>
                    
                </Text>
            </View>
            <View style={styles.teamMember}>
                <Image
                    source={require('../assets/images/abby.jpg')} 
                    style={styles.teamMemberImage}
                />
                <Text style={styles.teamMemberName}>Albertstein A. Rabin</Text>
                <Text style={styles.teamMemberRole}>Backend/Frontend Developer</Text>
                <Text style={styles.teamMemberBio}>
                    
                </Text>
            </View>

            <Button title="Back to Home" onPress={() => navigation.navigate('HomeDashboard')} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 30,
        color: '#555',
    },
    teamMember: {
        alignItems: 'center',
        marginBottom: 30,
    },
    teamMemberImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 10,
    },
    teamMemberName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    teamMemberRole: {
        fontSize: 18,
        color: '#777',
        marginBottom: 10,
    },
    teamMemberBio: {
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
        paddingHorizontal: 20,
    },
});

export default AboutDevTeamScreen;