#include <eosiolib/eosio.hpp>

namespace debug {
  struct foo {
    account_name from;
    account_name to;
    uint64_t amount;
    void print() const {
      eosio::print("Foo from ", from, " to ", to, " with amount ", amount, "\n");
    }
  };
}
