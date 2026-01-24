/** Represents a pet available for adoption. */
export interface Animal {
  id: number;
  name: string;
  breed: string;
  age: string;
  gender: 'Male' | 'Female';
  description: string;
  imageUrl: string;
  temperamentTags?: string[];
}

/** Represents a single message in the AI Vet chat. */
export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  isError?: boolean;
}

/** 
 * @deprecated This type is part of a deprecated feature and will be removed. 
 * Use VetClinic instead.
 */
export interface Vet {
  id: number;
  name: string;
  specialization: string;
  imageUrl: string;
  isOnline: boolean;
}

/** Represents a user of the application. */
export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // Should not be present in client-side state for real apps.
}

/** Represents a physical veterinary clinic. */
export interface VetClinic {
  id: number;
  name: string;
  address: string;
  phone: string;
  website?: string;
  mapUrl: string;
  hours: string;
  district: string;
}


/** Represents a successful adoption story. */
export interface SuccessStory {
  id: number;
  name: string;
  imageUrl: string;
  story: string;
}

/** Represents a comment on a community post. */
export interface Comment {
  id: number;
  author: {
    id: string | number;
    name: string;
  };
  content: string;
  timestamp: string;
}

/** Represents a post in the community hub. */
export interface Post {
  id: number;
  author: {
    id: string | number;
    name: string;
  };
  content: string;
  imageUrl?: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
}

/** Represents a question in the pet matchmaker quiz. */
export interface QuizQuestion {
  id: number;
  questionText: string;
  options: {
    text: string;
    tags: string[];
  }[];
}

/** Represents a volunteer opportunity. */
export interface VolunteerOpportunity {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  requiredSkills: string[];
}

/** Represents a tribute on the memorial wall. */
export interface Memorial {
  id: number;
  petName: string;
  ownerName: string;
  imageUrl: string;
  tribute: string;
  timestamp: string;
}

/** Represents a donation made by a user. */
export interface Donation {
  id: number;
  amount: number;
  date: string;
  method: 'bKash' | 'Nagad' | 'Bank Transfer';
}

/** Represents a user's adoption application. */
export interface Application {
  id: number;
  animalName: string;
  animalId: number;
  date: string;
  status: 'Pending' | 'In Review' | 'Approved' | 'Rejected';
}