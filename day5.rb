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

    def nextCharacter
        result = ''
        until (result[0..4] == '00000') do
            result = hash(@input + @counter.to_s)
            @counter = @counter + 1
        end
        result[5]
    end

    def getPassword
        result = ''
        for i in 1..8
            result += nextCharacter
        end
        result
    end
end



puts PasswordCracker.new(doorId).getPassword