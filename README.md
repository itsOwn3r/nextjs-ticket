## NextJS Ticketing System
  Fully-Functional Ticketing System With Next/React JS, MongoDB(with Prisma), and NextAuth.

  ![Return-Request-Ticketing-System1](https://github.com/itsOwn3r/nextjs-ticket/assets/119396660/7851fc22-f0cf-4613-842d-b479035fd0b5)

  
  ## Key Features
  Custom Login And Signup with NextAuth(With MongoDB and Prisma)
  
  Uploading Images
  
  Selecting the department
  
  Selecting the priority
  
  Adding tags
  
  Closing tickets
  
  Can have multiple agents answering the tickets
  
## `.env` file should look like this:
```bash
NEXTAUTH_URL=
NEXTAUTH_SECRET=
SECRET=
DATABASE_URL=
CLOUDINARY_URL=
cloud_name=
upload_preset=
```

Keep in mind, `Cloudinary` is only for uploading images and avatars.

`Secret` is for hashing the password with sha256 algorithm.



## Creating new agents to answer tickets

After they signed up, you just need to set the `type` of user to `admin`

## Preview
You can login to the [preview URL](https://ticket.own3r.me/) with email & password: `demo@demo.com`

You can also signup with your email!
