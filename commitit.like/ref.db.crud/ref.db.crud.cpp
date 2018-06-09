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

    void create( account_name user,
                 string title,
                 string content )
    {
      require_auth( user ); //验证权限
      das datable( _self, user);　//定义数据库对象
      datable.emplace(user, [&]( da & d){
        d.title = title;
        d.content = content;
        d.post_id = datable.available_primary_key();
        d.poster = user;
      });　//数据库内容创建
    }

  private:
   // @abi table data i64
   struct da {
     uint64_t     post_id;
     account_name poster;
     string       title;
     string       content;

     uint64_t primary_key()const { return post_id; }
     account_name get_poster() const { return poster; }

     EOSLIB_SERIALIZE(da, (post_id)(poster)(title)(content))
   };
   typedef eosio::multi_index<N(data), da, indexed_by<N(byposter), const_mem_fun<da, account_name, &da::get_poster>> > das;
};
EOSIO_ABI( test_da, (create) )
