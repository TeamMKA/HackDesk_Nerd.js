import { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function CreateMeet() {
  const [title, setTitle] = useState('Crime Prevention Strategies');
  const [description, setDescription] = useState('Learn about effective crime prevention strategies during this informative session.');
  const [date, setDate] = useState('2024-10-02');
  const [time, setTime] = useState('5:00 PM - 6:00 PM IST');
  const [meetLink, setMeetLink] = useState('https://meet.google.com/kgq-yuuq-xzb');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      title,
      description,
      date,
      time,
      meetLink,
    };

    try {
      const response = await axios.post('https://6nddmv2g-8000.inc1.devtunnels.ms/api/webinars/send-webinar', formData);
      console.log('Form submitted successfully:', response.data);
      toast.success('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form.');
    }
  };

  return (
    <Box sx={{ minWidth: 'full', mx: 'auto', p: 3, bgcolor: 'white', borderRadius: 2, boxShadow: 3 }}>
      <Toaster />
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Seminar Booking Event Form
      </Typography>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="title"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="description"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            fullWidth
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="date"
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="time"
            label="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            fullWidth
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="meetLink"
            label="Google Meet Link"
            type="url"
            value={meetLink}
            onChange={(e) => setMeetLink(e.target.value)}
            fullWidth
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
}