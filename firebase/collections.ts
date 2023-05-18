import { CollectionReference, collection } from 'firebase/firestore';
import { firestore } from '.';
import { MadnessContent } from '@/types/madness';
import { Contributor } from '@/types/contributor';
import { StoreItem } from '@/types/store';
import { Challenge } from '@/types/challenge';

export const contributorsCollectionRef = collection(firestore, 'contributors') as CollectionReference<Contributor>;
export const contentsCollectionRef = collection(firestore, 'markdownContents') as CollectionReference<MadnessContent>;
export const storeCollectionRef = collection(firestore, 'store') as CollectionReference<StoreItem>;
export const challengesCollectionRef = collection(firestore, 'challenges') as CollectionReference<Challenge>;
