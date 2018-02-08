import passport from 'passport';  
import passportJWT from 'passport-jwt'; 
import mongoose  from 'mongoose';
import cfg from './env';

var ExtractJwt = passportJWT.ExtractJwt;  
var Strategy = passportJWT.Strategy;  
var params = {  
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
};



module.exports = () => {    
    const User = mongoose.model('User');
      
    const strategy = new Strategy(params, 
        (playload, done) => {
            User.findOne({_id:	playload.id}).then((user) => {                
                if(user){                    
                    return done(null, {id : user.id, email : user.email});
                }
                return done(null, false);
            }).catch(error => done(error,null));
        });
    
    passport.use(strategy);

    return {
        initialize : () => {
            return passport.initialize();
        },
        authenticate : () => {
            return passport.authenticate('jwt', { session: false });
        }
    }

}


