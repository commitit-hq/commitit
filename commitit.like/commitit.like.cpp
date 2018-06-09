/**
 *  @commitit.like.cpp
 *  @copyright by commitit-hq
 */
#include <commitit.like.hpp>

// struct like_action {
//   uint64_t     voter;
//   string       pr_commiter;
//   string       pr_url;
//   int32_t      like_power;
//
//   like_record( uint32_t c = now() ):created(c){}
//   static Name table_id() { return Name("like"); }
// };

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

      eosio::print("voter: ", voter);
      // https://github.com/EOSIO/eos/issues/2984 string print not support for the testnet
      // eosio::print("pr_commiter: ", pr_commiter);
      // eosio::print("pr_url: ", pr_url);
    }
};

EOSIO_ABI( commitit, (like) )
