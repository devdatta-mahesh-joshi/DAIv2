export const typeDefs = `#graphql
type Doctor {
    id: ID!
    name: String!
    clinic: String!
    specialty: String!
    calendar: [Appointment]
  }
  
  type Patient {
    id: ID!
    name: String!
    calendar: [Appointment]
  }
  
  type Appointment {
    id: ID!
    doctor: Doctor!
    patient: Patient!
    datetime: String!
  }
  
  type Query {
    doctors: [Doctor]
    patients: [Patient]
    appointments(doctor: ID!): [Appointment]
    calendars: [Appointment]
  }

  type Mutation {
    addAppointment(doctor: ID!, patient: ID!, datetime: String!): Appointment
    cancelAppointment(appointment: ID!): String
    modifyAppointment(appointment: ID!, patient: ID!): String
  }
`;