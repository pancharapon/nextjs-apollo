import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { initializeApollo } from '../apollo/client.tsx';
import { useQuery, gql } from '@apollo/client';
import Cookies from 'js-cookie';

const GET_PROFILE = gql`
  query {
    myProfile {
      id
      role
      userName
      fullName
      profileImageUrl
      email
      phoneNumber
      birthDate
      titleLine
      bio
      videoPrice
      liveCallPrice
      hireEventFirstDepositPercentage
      hireEventMinBudget
      isChatPackageTurnon
      chatPackages {
        id
        chatQuotaType
        quota
        price
        isActive
        createdDate
        createdBy
      }
      stickerPrice
      stickers {
        id
        stickerUrl
        price
        isActive
        createdDate
        createdBy
      }
      subscriptionPrice
      subscriptions {
        id
        talentId
        subscriptionPrice
        joinDate
        outDate
        createdDate
        createdBy
      }
      videos {
        id
        videoUrl
        madeFor
        occation
        isActive
        createdDate
        createdBy
      }
      socialLinks
      firstLevelCategory
      secondLevelCategory
      responseIn
      reviews
      socialPlatform
      socialAccount
      totalFollower
      verifyEmail
      wallet_id
      actionLogs
      status
      createdDate
      createdBy
      creditCards {
        id
        cardType
        cardNumber
        cardHolderName
        cardExpireDate
        cardCVCCode
        createdDate
        omiseCustomerId
        user_id
        isActive
      }
    }
  }
`;

export default function Home(props) {
  // useEffect(() => {
  //   Cookies.set(
  //     'token',
  //     'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYWQ4YjFmLWNkMzMtNDk3Zi1hNWZhLWQ5ODg0N2JiYjQ3ZCIsInR5cGUiOjIsImV4cCI6MTYyMzc1NjI4OCwiaWF0IjoxNjIzNzUyNjg4fQ.eVvWJc1KHjYjuhoWyaj9J9NYIROiKNM_WtWhPs4Hj61xZiHvfclH4sW0O0DdtRLaFsAkka7rE2GykrZ0lSVyl3Z_WMqFsQMQVl4yUcgemSveWRZDyJGJdU6P5namTjP1Ffz7COkn1c3rwbnTcK3wiMpwbfJG1ZLKgeuK_HIAR3k'
  //   );
  // });

  const { data, loading, error } = useQuery(GET_PROFILE);

  console.log(props)

  if (loading) {
    return <div>loading ....</div>;
  }


  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_PROFILE,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
