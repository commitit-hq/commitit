/**
 *  @commitit.like.cpp
 *  @copyright by commitit-hq
 */
#include <commitit.like.hpp>

using namespace eosio;

class commitit : public eosio::contract {
  public:
    using contract::contract;

    /**
    * This action is called when a user casts a like
    */
    void like( account_name voter,
               std::string  pr_commiter,
               std::string  pr_url )
    {
      // checkings
      require_auth( voter );
      eosio_assert( pr_commiter.size() > 0, "pr_commiter cannot be blank" );
      eosio_assert( pr_url.size() > 0, "pr_url cannot be blank" );

      print("voter: ", voter);
      // https://github.com/EOSIO/eos/issues/2984 string print not support for the testnet
      // eosio::print("pr_commiter: ", pr_commiter);
      // eosio::print("pr_url: ", pr_url);
    }

  private:
    //@abi table like i64
    struct like_action {
      account_name voter;
      std::string  pr_commiter;
      std::string  pr_url;
      int32_t      like_power;

      EOSLIB_SERIALIZE( like_action, (voter)(pr_commiter)(pr_url)(like_power) )
    };
};

EOSIO_ABI( commitit, (like) )

// multiple action reference:
// EOSIO_ABI( dice, (offerbet)(canceloffer)(reveal)(claimexpired)(deposit)(withdraw) )
