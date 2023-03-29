const express =require('express');
const bodyParser = require('body-parser');
const passport =require ('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt =require('jsonwebtoken')

const app =express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const jwtOptions ={jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),secretOrKey:'secret-key'};
passport.use(new JwtStrategy(jwtOptions,(jwt_payload,done)=>{
    if(jwt_payload.sub ==='lingzhi liu')
    {
      return done(null,true);
    }
    else
    {
    return done(null,false);  
    }
}));

const requireAuth = passport.authenticate('jwt', { session: false });
app.get('/protected', requireAuth, (req, res) => {
    res.json({ message: 'You are authenticated' });
  });

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = { username, password };
    if (user.username === 'john' && user.password === 'password') {
      const token = jwt.sign({ sub: 'lingzhi liu' }, 'secret-key');
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });

app.listen(3000,()=>{
    console.log('server listening on port 3000');
});
