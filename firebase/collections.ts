import { CollectionReference, collection } from 'firebase/firestore';
import { firestore } from '.';
import { MadnessContent } from '@/types/madness';
import { Contributor } from '@/types/contributor';

export const contributorsCollectionRef = collection(firestore, 'contributors') as CollectionReference<Contributor>;
export const contentsCollectionRef = collection(firestore, 'markdownContents') as CollectionReference<MadnessContent>;
