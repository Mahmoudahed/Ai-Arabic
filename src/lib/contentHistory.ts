import { db } from './firebase';
import { collection, addDoc, getDocs, query, where, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { ContentHistory } from '../types/content';

export const saveContent = async (content: Omit<ContentHistory, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'contentHistory'), {
      ...content,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving content:', error);
    throw new Error('Failed to save content');
  }
};

export const getUserContentHistory = async (userId: string): Promise<ContentHistory[]> => {
  try {
    const q = query(
      collection(db, 'contentHistory'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    })) as ContentHistory[];
  } catch (error) {
    console.error('Error fetching content history:', error);
    throw new Error('Failed to fetch content history');
  }
};

export const deleteContent = async (contentId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'contentHistory', contentId));
  } catch (error) {
    console.error('Error deleting content:', error);
    throw new Error('Failed to delete content');
  }
}; 