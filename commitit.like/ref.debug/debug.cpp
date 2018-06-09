/**
 * Cannot be compiled since deprecated eosio::current_message API
 * Just for debug reference
 */
#include <debug.hpp>

extern "C" {
  void apply( uint64_t code, uint64_t action ) {
    if (code == N(debug)) {
      eosio::print("Code is debug\n");
      if (action == N(foo)) {
        eosio::print("Action is foo\n");
        // REMARK: removed from EOS DAWN 4.0, cannot build, maybe change to read_action_data()
        debug::foo f = eosio::current_message<debug::foo>();
        if (f.amount >= 100) {
          eosio::print("Amount is larger or equal than 100\n");
        } else {
          eosio::print("Amount is smaller than 100\n");
          eosio::print("Increase amount by 10\n");
          f.amount += 10;
          eosio::print(f);
        }
      }
    }
  }
} // extern "C"
