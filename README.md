# AuthRollers

## Firebase Authentication with Email-Password
      auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {})
     
## Firebase Social Authentication with Google

    GoogleSignin.configure({
     webClientId: 'YOUR-WEB-CLİENT-ID',
    });


    async function onGoogleButtonPress() {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
     }




https://user-images.githubusercontent.com/45879059/222505841-71d9303d-866f-4d95-9305-6aaa8f2465b3.mp4



https://user-images.githubusercontent.com/45879059/222505865-58094125-eb12-42b4-853e-4a5e261f8329.mp4



https://user-images.githubusercontent.com/45879059/222505884-4bec1236-3f2d-4335-aa6e-89ff8f889ae1.mp4


   
![UI1](https://user-images.githubusercontent.com/45879059/220424891-5f5747fd-b779-4535-bb3c-37e2cbf03d4d.png)

![Untitled-1](https://user-images.githubusercontent.com/45879059/221274209-5d56fd9a-37f1-4901-a3f5-0f63e5f47b40.png)
