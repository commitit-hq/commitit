/**
 *  @db.crud.cpp
 *  @copyright by commitit-hq
 *  account name: commititcrud
 *  public key: EOS7ogHLWAya3G87c2bimACYrJd9cGhdXLrtgAJzsszuW44H4kWd9
 */
#include <ref.db.crud.hpp>

using namespace eosio;
using namespace std;
class test_da : public contract {
  public:
    using contract::contract;
    test_da( account_name self ):contract(self){}

    void create( account_name voter,
                 string pr_commiter,
                 string pr_url )
    {
      require_auth( voter );
      likes datable( _self, voter );
      datable.emplace(voter, [&]( like & d ){
        d.pr_commiter = pr_commiter;
        d.pr_url = pr_url;
        d.like_id = datable.available_primary_key();
        d.voter = voter;
      });
    }

  private:
   // @abi table data i64
   struct like {
     uint64_t     like_id;
     account_name voter;
     string       pr_commiter;
     string       pr_url;

     uint64_t primary_key()const { return like_id; }
     account_name get_voter() const { return voter; }

     EOSLIB_SERIALIZE(like, (like_id)(voter)(pr_commiter)(pr_url))
   };
   typedef eosio::multi_index< N(data), like, indexed_by<N(byvoter), const_mem_fun<like, account_name, &like::get_voter>> > likes;
};
EOSIO_ABI( test_da, (create) )
