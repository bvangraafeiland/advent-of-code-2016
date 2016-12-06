require 'digest'

doorId = 'cxdnnyjw'

def hash(input)
    Digest::MD5.hexdigest(input)
end

class PasswordCracker
    def initialize(input)
        @input = input
        @counter = 0
    end

    def is_valid_position(character, current_result)
        (!! /[0-7]/.match(character)) and current_result[character.to_i] == nil
    end

    def next_interesting_hash(current_result)
        result = ''
        until (result[0..4] == '00000' and is_valid_position(result[5], current_result)) do
            result = hash(@input + @counter.to_s)
            @counter = @counter + 1
        end
        return result
    end

    def get_password
        result = []
        until result.size == 8 and not result.include? nil
            nextHash = next_interesting_hash(result)
            result[nextHash[5].to_i] = nextHash[6]
        end
        return result.join
    end
end



puts PasswordCracker.new(doorId).get_password