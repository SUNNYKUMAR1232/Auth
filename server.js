const express =require ("express");
const mongoose =require ("mongoose");
const session =require ("express-session");
const MongoStore = require('connect-mongo');

const AuthRoute =require( "./routes/authRoutes");
const passport =require( "./services/passport");

const { URI, SECRET } =require( "./config");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());



app.use(
    session({
      secret: SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ // Use .create() method
        mongoUrl: URI, // Use mongoUrl instead of mongooseConnection
        autoRemove: "interval",
        autoRemoveInterval: 10,
      }),
    })
  );

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", AuthRoute);

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to mongo database"))
  .catch((error) => console.error(error));

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));