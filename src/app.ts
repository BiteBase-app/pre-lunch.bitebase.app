// Import routes
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import restaurantPlatformsRouter from './api/restaurant-platforms';

// Register routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/restaurant-platforms', restaurantPlatformsRouter); 