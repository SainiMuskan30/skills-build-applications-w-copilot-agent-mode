"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('🗄️ Connected to octofit_db');
        // Clear existing data
        await models_1.User.deleteMany({});
        await models_1.Team.deleteMany({});
        await models_1.Activity.deleteMany({});
        await models_1.Workout.deleteMany({});
        await models_1.Leaderboard.deleteMany({});
        console.log('✨ Cleared existing collections');
        // Create sample users
        const users = await models_1.User.insertMany([
            {
                username: 'alex_runner',
                email: 'alex@example.com',
                passwordHash: 'hashed_password_1',
                profile: {
                    firstName: 'Alex',
                    lastName: 'Runner',
                    bio: 'Marathon enthusiast and fitness coach',
                    profilePicture: 'https://via.placeholder.com/150?text=Alex',
                },
            },
            {
                username: 'jordan_lifts',
                email: 'jordan@example.com',
                passwordHash: 'hashed_password_2',
                profile: {
                    firstName: 'Jordan',
                    lastName: 'Lifts',
                    bio: 'Strength training and bodybuilding',
                    profilePicture: 'https://via.placeholder.com/150?text=Jordan',
                },
            },
            {
                username: 'casey_swimmer',
                email: 'casey@example.com',
                passwordHash: 'hashed_password_3',
                profile: {
                    firstName: 'Casey',
                    lastName: 'Swimmer',
                    bio: 'Competitive swimmer and triathlete',
                    profilePicture: 'https://via.placeholder.com/150?text=Casey',
                },
            },
            {
                username: 'morgan_yoga',
                email: 'morgan@example.com',
                passwordHash: 'hashed_password_4',
                profile: {
                    firstName: 'Morgan',
                    lastName: 'Yoga',
                    bio: 'Yoga instructor and wellness coach',
                    profilePicture: 'https://via.placeholder.com/150?text=Morgan',
                },
            },
            {
                username: 'sam_cyclist',
                email: 'sam@example.com',
                passwordHash: 'hashed_password_5',
                profile: {
                    firstName: 'Sam',
                    lastName: 'Cyclist',
                    bio: 'Road cycling and mountain biking',
                    profilePicture: 'https://via.placeholder.com/150?text=Sam',
                },
            },
        ]);
        console.log(`✅ Created ${users.length} sample users`);
        // Create sample teams
        const teams = await models_1.Team.insertMany([
            {
                name: 'Morning Runners Club',
                description: 'A community of early morning runners',
                leader: users[0]._id,
                members: [users[0]._id, users[2]._id],
            },
            {
                name: 'Gym Warriors',
                description: 'Strength training and fitness enthusiasts',
                leader: users[1]._id,
                members: [users[1]._id, users[3]._id],
            },
            {
                name: 'Cycle Kings',
                description: 'Road cycling and mountain biking team',
                leader: users[4]._id,
                members: [users[4]._id, users[0]._id],
            },
        ]);
        console.log(`✅ Created ${teams.length} sample teams`);
        // Update users with teams
        await models_1.User.findByIdAndUpdate(users[0]._id, { team: teams[0]._id });
        await models_1.User.findByIdAndUpdate(users[1]._id, { team: teams[1]._id });
        await models_1.User.findByIdAndUpdate(users[4]._id, { team: teams[2]._id });
        // Create sample activities
        const activities = await models_1.Activity.insertMany([
            {
                user: users[0]._id,
                type: 'running',
                duration: 45,
                calories: 450,
                description: 'Morning run in the park',
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            },
            {
                user: users[0]._id,
                type: 'running',
                duration: 60,
                calories: 620,
                description: 'Long distance run',
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            },
            {
                user: users[1]._id,
                type: 'strength',
                duration: 90,
                calories: 550,
                description: 'Upper body workout - bench press, rows, pull-ups',
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            },
            {
                user: users[1]._id,
                type: 'strength',
                duration: 75,
                calories: 480,
                description: 'Leg day - squats, lunges, calf raises',
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            },
            {
                user: users[2]._id,
                type: 'swimming',
                duration: 50,
                calories: 400,
                description: 'Pool training - 2000m swim',
                date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            },
            {
                user: users[3]._id,
                type: 'yoga',
                duration: 60,
                calories: 180,
                description: 'Morning yoga and meditation',
                date: new Date(),
            },
            {
                user: users[4]._id,
                type: 'cycling',
                duration: 120,
                calories: 800,
                description: 'Road cycling - 50km route',
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            },
            {
                user: users[4]._id,
                type: 'cycling',
                duration: 90,
                calories: 650,
                description: 'Mountain biking trail',
                date: new Date(),
            },
        ]);
        console.log(`✅ Created ${activities.length} sample activities`);
        // Create sample workouts
        const workouts = await models_1.Workout.insertMany([
            {
                name: 'Beginner 5K Training',
                description: 'Perfect for beginners training for a 5K run',
                exercises: [
                    { name: 'Warm-up walk', duration: 5 },
                    { name: 'Running intervals', duration: 20 },
                    { name: 'Cool-down walk', duration: 5 },
                ],
                difficulty: 'beginner',
                estimatedDuration: 30,
                targetMuscles: ['legs', 'cardio'],
            },
            {
                name: 'Intermediate Upper Body Strength',
                description: 'Build chest, back, and shoulder strength',
                exercises: [
                    { name: 'Bench Press', sets: 4, reps: 8 },
                    { name: 'Barbell Rows', sets: 4, reps: 8 },
                    { name: 'Pull-ups', sets: 3, reps: 10 },
                    { name: 'Dumbbell Shoulder Press', sets: 3, reps: 10 },
                ],
                difficulty: 'intermediate',
                estimatedDuration: 60,
                targetMuscles: ['chest', 'back', 'shoulders', 'arms'],
            },
            {
                name: 'Advanced HIIT Cardio',
                description: 'High intensity interval training for cardio conditioning',
                exercises: [
                    { name: 'Burpees', duration: 30 },
                    { name: 'Jump Squats', duration: 30 },
                    { name: 'Mountain Climbers', duration: 30 },
                    { name: 'Rest', duration: 30 },
                ],
                difficulty: 'advanced',
                estimatedDuration: 30,
                targetMuscles: ['full body', 'cardio'],
            },
            {
                name: 'Yoga Flow for Flexibility',
                description: 'Gentle yoga to improve flexibility and reduce stress',
                exercises: [
                    { name: 'Sun Salutations', sets: 5 },
                    { name: 'Standing Poses', duration: 20 },
                    { name: 'Seated Stretches', duration: 15 },
                    { name: 'Savasana', duration: 10 },
                ],
                difficulty: 'beginner',
                estimatedDuration: 45,
                targetMuscles: ['flexibility', 'relaxation'],
            },
            {
                name: 'Cyclist Endurance Training',
                description: 'Build endurance for long-distance cycling',
                exercises: [
                    { name: 'Steady pace ride', duration: 90 },
                    { name: 'Hill repeats', duration: 20 },
                    { name: 'Cool down', duration: 10 },
                ],
                difficulty: 'intermediate',
                estimatedDuration: 120,
                targetMuscles: ['legs', 'cardio'],
            },
        ]);
        console.log(`✅ Created ${workouts.length} sample workouts`);
        // Create leaderboard entries
        const leaderboardEntries = await models_1.Leaderboard.insertMany([
            {
                user: users[0]._id,
                team: teams[0]._id,
                totalCaloriesBurned: 1070,
                activitiesCount: 2,
                averageDuration: 52.5,
                rank: 1,
                score: 1200,
                period: 'weekly',
            },
            {
                user: users[1]._id,
                team: teams[1]._id,
                totalCaloriesBurned: 1030,
                activitiesCount: 2,
                averageDuration: 82.5,
                rank: 2,
                score: 1150,
                period: 'weekly',
            },
            {
                user: users[4]._id,
                team: teams[2]._id,
                totalCaloriesBurned: 1450,
                activitiesCount: 2,
                averageDuration: 105,
                rank: 1,
                score: 1600,
                period: 'weekly',
            },
            {
                user: users[2]._id,
                totalCaloriesBurned: 400,
                activitiesCount: 1,
                averageDuration: 50,
                rank: 4,
                score: 450,
                period: 'weekly',
            },
            {
                user: users[3]._id,
                totalCaloriesBurned: 180,
                activitiesCount: 1,
                averageDuration: 60,
                rank: 5,
                score: 200,
                period: 'weekly',
            },
            {
                user: users[0]._id,
                team: teams[0]._id,
                totalCaloriesBurned: 1070,
                activitiesCount: 2,
                averageDuration: 52.5,
                rank: 1,
                score: 1200,
                period: 'allTime',
            },
            {
                user: users[1]._id,
                team: teams[1]._id,
                totalCaloriesBurned: 1030,
                activitiesCount: 2,
                averageDuration: 82.5,
                rank: 2,
                score: 1150,
                period: 'allTime',
            },
            {
                user: users[4]._id,
                team: teams[2]._id,
                totalCaloriesBurned: 1450,
                activitiesCount: 2,
                averageDuration: 105,
                rank: 1,
                score: 1600,
                period: 'allTime',
            },
        ]);
        console.log(`✅ Created ${leaderboardEntries.length} leaderboard entries`);
        console.log('\n🎉 Database seeding complete!');
        console.log('\n📊 Database Summary:');
        console.log(`   • Users: ${users.length}`);
        console.log(`   • Teams: ${teams.length}`);
        console.log(`   • Activities: ${activities.length}`);
        console.log(`   • Workouts: ${workouts.length}`);
        console.log(`   • Leaderboard entries: ${leaderboardEntries.length}`);
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
//# sourceMappingURL=seed.js.map