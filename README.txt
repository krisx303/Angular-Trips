User accounts:

adminmeil@gmail.com
654321

krisxd303@gmail.com
hellokris312

manageremeil@gmail.com
123456


Firestore rules:


rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
  
    match /users/{userId}/trips/{document} {
      allow create, read, update, delete, write: if request.auth != null && request.auth.uid == userId;
    }
    
    
    match /trips/{document} {
        allow update: if request.auth != null && (request.resource.data.diff(resource.data).affectedKeys()
        .hasOnly(['maxSlots']));
        
    	function getRole(role){
        	return get(/databases/$(database)/documents/users/$(request.auth.uid)).data[role];
        }
    	allow read: if true;
        
        allow update, delete, create: if getRole('manager') == true;
    }
    
    match /users/{userId} {
      allow read, update, delete: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
    }
  }
}