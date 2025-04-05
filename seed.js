const mongoose = require('mongoose');
const Incident = require('./models/incident');
const connect = require('./config/database');

require('dotenv').config();

connect();


  const sampleIncidents = [
    {
      title: 'Incorrect Output from AI in Healthcare',
      description: 'An AI tool used for medical diagnostics generated false information, resulting in a wrong treatment suggestion.',
      severity: 'High',
      reported_at: new Date('2025-03-15T10:30:00Z')
    },
    {
      title: 'Bias in AI Due to Flawed Training Data',
      description: 'A recruitment algorithm showed biased behavior due to unbalanced or discriminatory data in its training set.',
      severity: 'Medium',
      reported_at: new Date('2025-03-25T14:45:00Z')
    },
    {
      title: 'Sensitive Data Exposure via Chatbot',
      description: 'A chatbot mistakenly disclosed private details from earlier user conversations, breaching privacy expectations.',
      severity: 'Low',
      reported_at: new Date('2025-04-01T09:15:00Z')
    }
  ];
  

const seedDB = async () => {
  try {
   
    await Incident.deleteMany({});
    console.log('Cleared existing incidents');
    

    const seededIncidents = await Incident.insertMany(sampleIncidents);
    console.log(`Seeded ${seededIncidents.length} incidents`);
    
    
    mongoose.disconnect();
    console.log('Database seeded ');
  } 
  catch (error) {
    console.error('Error seeding database:', error.message);
    mongoose.disconnect();
    process.exit(1);
  }
};


seedDB();