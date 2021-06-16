import { gql } from '@apollo/client'

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
`

export {
  GET_PROFILE
}
