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
   
![UI1](https://user-images.githubusercontent.com/45879059/220424891-5f5747fd-b779-4535-bb3c-37e2cbf03d4d.png)

![Untitled-1](https://user-images.githubusercontent.com/45879059/221274209-5d56fd9a-37f1-4901-a3f5-0f63e5f47b40.png)
