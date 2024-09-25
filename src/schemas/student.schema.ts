import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Student {
  @Prop({ type: String, unique: true, required: true })
  student_id: string;

  @Prop({ type: String, required: true })
  first_name: string;

  @Prop({ type: String, required: true })
  last_name: string;

  @Prop({ type: String, unique: true, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string; // Hashed password

  @Prop({ type: String })
  profile_picture_url: string;

  @Prop({ type: String })
  gender: string;

  @Prop({ type: Date })
  date_of_birth: Date;

  @Prop({
    type: {
      phone_number: String,
      emergency_contact: {
        name: String,
        relationship: String,
        phone_number: String,
      },
    },
  })
  contact_information: {
    phone_number: string;
    emergency_contact: {
      name: string;
      relationship: string;
      phone_number: string;
    };
  };

  @Prop({
    type: {
      street: String,
      city: String,
      state: String,
      country: String,
      postal_code: String,
    },
  })
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
  };

  @Prop({
    type: {
      enrollment_year: Number,
      program: String,
      department: String,
      current_year: Number,
      cgpa: Number,
      courses_enrolled: [
        {
          course_id: String,
          course_name: String,
          instructor_name: String,
          grade: String,
        },
      ],
      achievements: [
        {
          title: String,
          description: String,
          date: Date,
        },
      ],
    },
  })
  academic_information: {
    enrollment_year: number;
    program: string;
    department: string;
    current_year: number;
    cgpa: number;
    courses_enrolled: Array<{
      course_id: string;
      course_name: string;
      instructor_name: string;
      grade: string;
    }>;
    achievements: Array<{
      title: string;
      description: string;
      date: Date;
    }>;
  };

  @Prop({
    type: {
      scholarships: [
        {
          name: String,
          amount: Number,
          description: String,
        },
      ],
      tuition_fees_paid: Boolean,
      outstanding_fees: Number,
    },
  })
  financial_information: {
    scholarships: Array<{
      name: string;
      amount: number;
      description: string;
    }>;
    tuition_fees_paid: boolean;
    outstanding_fees: number;
  };

  @Prop({
    type: [
      {
        activity_name: String,
        role: String,
        description: String,
      },
    ],
  })
  extra_curricular_activities: Array<{
    activity_name: string;
    role: string;
    description: string;
  }>;

  @Prop({
    type: {
      last_login: Date,
      login_attempts: Number,
      account_status: {
        type: String,
        enum: ['active', 'suspended', 'locked'],
        default: 'active',
      },
    },
  })
  login_activity: {
    last_login: Date;
    login_attempts: number;
    account_status: string;
  };

  @Prop({
    type: {
      is_registered: Boolean,
      registration_date: Date,
    },
  })
  registration_status: {
    is_registered: boolean;
    registration_date: Date;
  };

  @Prop({
    type: {
      linkedIn: String,
      github: String,
      personal_website: String,
    },
  })
  social_links: {
    linkedIn: string;
    github: string;
    personal_website: string;
  };

  @Prop({
    type: [
      {
        question: String,
        answer: String,
      },
    ],
  })
  security_questions: Array<{
    question: string;
    answer: string;
  }>;

  @Prop({
    type: [
      {
        title: String,
        content: String,
        date: Date,
        is_read: Boolean,
      },
    ],
  })
  notifications: Array<{
    title: string;
    content: string;
    date: Date;
    is_read: boolean;
  }>;
}
export const StudentSchema = SchemaFactory.createForClass(Student);
