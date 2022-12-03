import { appointments, doctors, patients } from './data.js';


export let resolvers = {

    Appointment: {
      doctor(parent){
        console.log(parent);
        console.log(doctors.filter((doctor) => {return doctor.id === parent.doctor}));
        return doctors.find((doctor) => {
            // console.log("doctor id");
            // console.log(doctor.id);
            // console.log("parent id");
            // console.log(parent.id);
            // console.log(doctor.id === parent.id);
            return doctor.id === parent.doctor;
        });
      },
      patient(parent){
        console.log(patients.filter((patient) => patient.id === parent.patient));
        return patients.find((patient) => {
            // console.log("patient id");
            // console.log(patient.id);
            // console.log("parent id");
            // console.log(parent.id);
            // console.log(patient.id === parent.id);
            return patient.id === parent.patient;
        });
      }
    },

    Doctor: {
      calendar(parent){
        return appointments.filter((appointment) => {
            // console.log("CURRENT DOCTOR")
            // console.log(appointment.doctor);
            // console.log(parent.id);
            return appointment.doctor === parent.id;
        } )
      }
    },

    Patient: {
        calendar(parent){
            return appointments.filter((appointment) => {
                // console.log("CURRENT DOCTOR")
                // console.log(appointment.patient);
                // console.log(parent.id);
                return appointment.patient === parent.id;
            } )
          }
    },

    Query: {
        doctors (parent, args, context, info) {
            return doctors
        },
        patients(){
            return patients
        },
        appointments(parent, args, context, info){   
            console.log(args);
            let keys = Object.keys(args);
            // console.log(keys);
            let index = keys.findIndex((key) => key === 'doctor');
            let newkeys = keys;
            newkeys.splice(index,1);
            // console.log(newkeys);
            if (!newkeys){
                // console.log("EXTRA PARAMETERS FOUND");
                return null
            }

            return appointments.filter((appointment) => {
                return appointment.doctor === args.doctor;
            });
        },
        calendars(parent, args, context, info){
        return appointments;
        }
    },
    
    Mutation: {
        addAppointment(parent, args, context, info){
            // console.log(args);
            let ids = appointments.map((appointment) => Number(appointment.id));
            let newID = Math.max(...ids) + 1 ;
            let newAppointment = {
                id: newID.toString(),
                doctor: args.doctor,
                patient: args.patient,
                datetime: args.datetime
            }
            // console.log("Before")
            // console.log(appointments)
            appointments.push(newAppointment);
            // console.log("After")
            // console.log(appointments)
            return newAppointment;
        },

        cancelAppointment(parent, args, context, info){
            console.log(args);
            let foundAppointment = appointments.find((appointment) => {
                return appointment.id === args.appointment
            })
            console.log("Appointment found")
            console.log(foundAppointment)
            if (!foundAppointment){
                console.log("INVALID QUERY")
                return "INVALID QUERY, ID does not exist"
            }
            let appointmentIndex = appointments.findIndex((appointment) => appointment.id == args.id);
            console.log("INDEX FOUND");
            console.log(appointmentIndex);
            appointments.splice(appointmentIndex, 1);
            console.log("DELETED ELEMENT")
            console.log(appointments)
            // appointments = appointments.filter((appointment) => appointment.id != args.id)
            console.log("QUERY SUCCESSFUL")
            return "Appointment Deleted";
        },

        modifyAppointment(parent, args, context, info){
            console.log(args);
            let foundAppointment = appointments.find((appointment) => {
                return appointment.id === args.appointment
            })
            console.log("Appointment found")
            console.log(foundAppointment)
            if (!foundAppointment){
                console.log("INVALID QUERY")
                return "INVALID QUERY, ID does not exist"
            }

            let appointmentIndex = appointments.findIndex((appointment) => appointment.id == args.id);
            console.log("INDEX FOUND");
            console.log(appointmentIndex);

            appointments.splice(appointmentIndex, 1);
            console.log("DELETED ELEMENT")
            console.log(appointments)

            foundAppointment.patient = args.patient;
            appointments.push(foundAppointment);
            console.log("ADDED ELEMENT")
            console.log(appointments)
            
            // appointments = appointments.filter((appointment) => appointment.id != args.id)
            console.log("QUERY SUCCESSFUL")
            return "Appointment Modified";
        }
    }
  
}

