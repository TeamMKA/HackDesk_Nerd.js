import mongoose from 'mongoose';

// Define the Event schema
const webinarSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true, // You might want to consider using a more structured time format
    },
    meetLink: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create the Event model
const Webinar = mongoose.model('Webinar', webinarSchema);

export default Webinar