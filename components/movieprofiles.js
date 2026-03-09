import { View, Text, Image, StyleSheet, Button } from 'react-native';

export default function ProfileCard({
  name = 'Movie Name',
  subtitle = 'Movie Description',
  avatarUri = '',
  tags = [''],
  onPress = () => {},
}) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Image source={{ uri: avatarUri }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      <View style={styles.tagRow}>
        {tags.map((t) => (
          <View key={t} style={styles.tag}>
            <Text style={styles.tagText}>{t}</Text>
          </View>
        ))}
      </View>

      <View style={styles.buttonRow}>
        <Button title="Add to Watch List" onPress={onPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,          
    gap: 12,
    height: 500,
  },

  headerRow: { flexDirection: 'row', gap: 12, backgroundColor:'lightblue' },
  avatar: { width: 200, height: 250, borderRadius: 32, },
  name: { fontSize: 48, fontWeight: '700', backgroundColor: 'lightpink', textAlign: 'center',  },
  subtitle: { fontSize: 14, color: '#64748b', marginTop: 2 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'space-between'},
  tag: {backgroundColor: '#f1f5f9', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 9999,},
  tagText: { fontSize: 16, color: '#334155' },
  buttonRow: { alignSelf: 'flex-start' }
});
