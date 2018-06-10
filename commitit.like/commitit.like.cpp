/**
 *  @commitit.like.cpp
 *  @copyright by commitit-hq
 *  account name: commititlike
 *  public key: EOS7ogHLWAya3G87c2bimACYrJd9cGhdXLrtgAJzsszuW44H4kWd9
 */
#include <commitit.like.hpp>

using namespace eosio;
using namespace std;
class commitit : public contract {
  public:
    using contract::contract;
    commitit( account_name self ):contract(self){}

    /**
     * mint CMT: periodically issue constant size of CMT
     * WARNING: Conecept code, further development needed
     */
    void initmint() {
      std::clock_t genesis_start;
      genesis_start = std::clock();

      uint32_t MINT_PERIOD;
      MINT_PERIOD = 60 // mint CMT per 60 seconds

      uint32_t MINT_QUANTITY_PER_PERIOD;
      MINT_QUANTITY_PER_PERIOD = 100 // mint CMT quantity per period

      double duration;
      duration = ( std::clock() - start ) / (double) CLOCKS_PER_SEC;

      while(true) {
        if ( duration % MINT_PERIOD == 0) {
          // issue 90% mint CMT to PR commiter based on weight
          // issue 10% mint CMT to Voter base on weight
          // TODO: transfer()
        }
      }
    }

    /**
     * transfer CMT
     * @account_name   from
     * @account_name   to
     * @asset          quantity
     * @string         memo
     */
    void transfer( account_name from,
                   account_name to,
                   asset        quantity,
                   string       memo )
    {
        eosio_assert( from != to, "cannot transfer to self" );
        require_auth( from );
        eosio_assert( is_account( to ), "to account does not exist");
        auto sym = quantity.symbol.name();
        stats statstable( _self, sym );
        const auto& st = statstable.get( sym );

        require_recipient( from );
        require_recipient( to );

        eosio_assert( quantity.is_valid(), "invalid quantity" );
        eosio_assert( quantity.amount > 0, "must transfer positive quantity" );
        eosio_assert( quantity.symbol == st.supply.symbol, "symbol precision mismatch" );
        eosio_assert( memo.size() <= 256, "memo has more than 256 bytes" );

        sub_balance( from, quantity );
        add_balance( to, quantity, from );
    }

    /**
     * sub balance
     * @account_name   owner
     * @asset          quantity
     */
    void sub_balance( account_name owner,
                      asset        value )
    {
       accounts from_acnts( _self, owner );

       const auto& from = from_acnts.get( value.symbol.name(), "no balance object found" );
       eosio_assert( from.balance.amount >= value.amount, "overdrawn balance" );

       if( from.balance.amount == value.amount ) {
          from_acnts.erase( from );
       } else {
          from_acnts.modify( from, owner, [&]( auto& a ) {
              a.balance -= value;
          });
       }
    }

    /**
     * add balance
     * @account_name   owner
     * @asset          quantity
     * @account_name   ram_payer
     */
    void add_balance( account_name owner,
                      asset        value,
                      account_name ram_payer )
    {
       accounts to_acnts( _self, owner );
       auto to = to_acnts.find( value.symbol.name() );
       if( to == to_acnts.end() ) {
          to_acnts.emplace( ram_payer, [&]( auto& a ){
            a.balance = value;
          });
       } else {
          to_acnts.modify( to, 0, [&]( auto& a ) {
            a.balance += value;
          });
       }
    }

    /**
     * add balance
     * @account_name   owner
     * @asset          quantity
     * @account_name   ram_payer
     */
    asset get_balance( account_name owner,
                       symbol_name  sym )
    {
      accounts accountstable( _self, owner );
      const auto& ac = accountstable.get( sym );
      return ac.balance;
    }

    /**
     * create like
     * @account_name   voter
     * @string         pr_commiter
     * @string         pr_url
     */
    void createlike( account_name voter,
                     string       pr_commiter,
                     string       pr_url )
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
    struct account {
      asset    balance;

      uint64_t primary_key()const { return balance.symbol.name(); }
    };

    struct currency_stats {
      asset          supply;
      asset          max_supply;
      account_name   issuer;

      uint64_t primary_key()const { return supply.symbol.name(); }
    };

    typedef eosio::multi_index<N(accounts), account> accounts;
    typedef eosio::multi_index<N(stat), currency_stats> stats;

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
    typedef multi_index< N(data), like, indexed_by<N(byvoter), const_mem_fun<like, account_name, &like::get_voter>> > likes;
};

EOSIO_ABI( commitit, (initmint)(transfer)(sub_balance)(add_balance)(createlike) )
