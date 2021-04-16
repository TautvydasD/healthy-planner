<template>
  <Page
    actionBarHidden="true"
  >
    <FlexboxLayout
      class="page"
    >
      <StackLayout class="form">
        <!-- Login page header -->
        <Image
          class="logo"
          src="~/images/strength.png">
        </Image>
        <Label
          class="header"
          text="PopoPlan"
        >
        </Label>
        <!-- Login Form -->
        <GridLayout
          rows="auto, auto, auto"
        >
          <StackLayout
            row="0"
            class="input-field-wrapper"
          >
            <TextField
              v-model="user.email"
              class="input-wrapper"
              hint="Email"
              keyboardType="email"
              autocorret="false"
              autocapitalizationType="none"
              returnKeyType="next"
            >
            </TextField>
            <StackLayout
              class=""
            >
            </StackLayout>
          </StackLayout>
          <StackLayout
            row="1"
            class="input-field-wrapper"
          >
            <TextField
              ref="password"
              v-model="user.password"
              class="input-wrapper"
              hint="Password"
              secure="true"
              :returnKeyType="isSignUp ? 'next' : 'done'"
            >
            </TextField>
            <StackLayout
              class=""
            >
            </StackLayout>
          </StackLayout>
          <StackLayout
            v-show="isSignUp"
            row="2"
            class="input-field-wrapper"
          >
            <TextField
              ref="confirmPassword"
              v-model="user.confirmPassword"
              class="input-wrapper"
              hint="Confirm Password"
              secure="true"
              returnKeyType="done"
            >
            </TextField>
            <StackLayout
              class=""
            >
            </StackLayout>
            <ActivityIndicator
              rowSpan="3"
              :busy="isProcessing"
            >
            </ActivityIndicator>
          </StackLayout>
        </GridLayout>
        <!-- Login buttons -->

        <Button
          class="button-wrapper"
          :text="isSignUp ? 'Sign up' : 'Log In'"
          :isEnabled="!isProcessing"
          @tap="submit"
        >
        </Button>
        <Label
          v-show="!isSignUp"
          class="forgotten-password-label"
          text="Forgot your password?"
          @tap="resetPassword"
        >
        </Label>
        <Label
          class="sign-up-label"
          @tap="toggleSignUp"
        >
          <FormattedString>
            <Span
              :text="isSignUp ? 'Return to login page' : 'Create an account. '"        
            >
            </Span>
            <Span
              class="bold"
              :text="isSignUp ? '' : 'Sign up'"
            >
            </Span>
          </FormattedString>
        </Label>
      </StackLayout>
    </FlexboxLayout>
  </Page>    
</template>

<script>
import App from './App'

export default {
  data () {
    return {
      isSignUp: false,
      isProcessing: false,
      ipAddress: 'http://192.168.1.11:5000',
      // ipAddress: 'http://10.0.2.2:5000',
      user: {
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  mounted () {
    this.$store.commit('loadFromStorage')
    if (this.$store.state.token) {
      this.$navigateTo(App, {
        clearHistory: true
      })
    }
  },
  methods: {
    toggleSignUp () {
      this.isSignUp = !this.isSignUp
    },
    login () {
      console.log('logging in')
      this.$http.post(this.ipAddress + '/api/login', {
        email: this.user.email,
        password: this.user.password
      }).then(res => {
        console.log('login passed')
        this.isProcessing = false
        this.$store.dispatch('setUsername', this.user.username)
        this.$store.dispatch('setUser', 'heyo').then(() => {
          console.log(this.$store.state.token)
          this.$navigateTo(this.$routes.Home, {
            clearHistory: true
          })
        })
      }).catch(err => {
        console.log('log failed')
        this.isProcessing = false
        if (err.response.status === 401) {
        }
        this.alert(err.response.data.error)
        
      }).catch(err => {
        console.log('logjn failed')
        this.alert(err)
      })

    },
    signUp () {
      this.$http.post(this.ipAddress + '/api/signup', {
        email: this.user.email,
        username: this.user.email.split('@')[0],
        password: this.user.password
      }).then(res => {
        this.isProcessing = false
          this.$store.dispatch('setUser', 'heyo').then(() => {
            console.log(this.$store.state.token)
            this.$navigateTo(App, {
              clearHistory: true
            })
          })
        // this.$store.dispatch('setUsername', this.user.username).then(() => {
        // })
      }).catch(err => {
        this.isProcessing = false
        if (err.response.status === 409) {
          this.alert('Email is already in use.')
        } else {
          this.alert(err.response.data.error)
        }
      }).catch(err => {
        this.alert(err)
      })
    },
    submit () {
      this.isProcessing = true
      if (this.isSignUp) {
        if (!this.user.email || !this.user.password) {
          this.isProcessing = false
          this.alert('Email and password are required.')
          return
        }
        if (this.user.password !== this.user.confirmPassword) {
          this.isProcessing = false
          this.alert('Password fields must match.')
          return
        }
        this.signUp()
      } else {
        if (this.user.email && this.user.password) {
          this.login()
        }
      }
    },
    resetPassword () {
      prompt({
        title: 'Forgotten Password',
        message: 'Enter your email to reset your password',
        inputType: 'email',
        defaultText: '',
        okButtonText: 'Enter',
        cancelButtonText: 'Cancel'
        .then(data => {

        })
      })
    },
    alert (text) {
      return alert({
        title: 'PopoPlan',
        okButtonText: 'Continue',
        message: text
      })
    },
    focusPassword () {
      this.$refs.password.nativeView.focus()
    },
    focusConfirmPassword () {
      if (this.isSignUp) {
        this.$refs.confirmPassword.nativeView.focus()
      }
    }
  }
}
</script>

<style scoped>
  .page {
    align-items: center;
    flex-direction: column;
    /* background-color: #ffffff; */
  }
  .form {
    margin-left: 40;
    margin-right: 40;
    vertical-align: middle;
    flex-grow: 2;
  }
  .logo {
    margin-bottom: 12;
    height: 90;
  }
  .header {
    /* horizontal-align: center; */
    font-size: 25;
    font-weight: 70;
    text-align: center;
    color: #da714a;
  }
  .input-field-wrapper {
    margin-bottom: 30;
  }
  .input-wrapper {
    font-size: 18;
  }
  .input-wrapper:disabled {
    background-color: white;
    opacity: 0.5;
  }
  .button-wrapper {
    background: linear-gradient(to bottom left, #da714a, #f0bb46);
    color: #ffffff;
    font-size: 18;
  }
  .forgotten-password-label {
    horizontal-align: center;
    color: #da714a;
    text-decoration: underline;
    font-size: 18;
  }
  .sign-up-label {
    horizontal-align: center;
    margin-top: 30;
    font-size: 18;
    text-decoration: underline;
  }
  .bold {
    font-weight: bold;
    color: #da714a;
    text-decoration: underline;
  }
</style>