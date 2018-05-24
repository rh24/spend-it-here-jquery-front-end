require 'rubygems'
require 'open-uri'

class Scraper
  @@all = []

  def self.scrape_coins

    doc = Nokogiri::HTML(open('https://coinmarketcap.com/all/views/all/'))

    coin_hash_array = doc.css('table').css('tr').collect do |coin|
        coin_hash = {
          :rank => coin.css('.text-center').text.strip,
          :name => coin.css('.currency-name').css('.currency-name-container').text.strip,
          :symbol => coin.css('.currency-name').css('span a').text.strip,
          :price => coin.css('td').css('.price').text.strip,
          :supply => coin.css('td').css('.circulating-supply').text.gsub(/\s+/, "").gsub("*", " *"),
          :market_cap => coin.css('td').css('.market-cap').text.strip,
          :volume => coin.css('td').css('.volume').text.strip,
          :hr_percent_change => coin.css('td').css('.percent-1h').text.strip,
          :day_percent_change => coin.css('td').css('.percent-24h').text.strip,
          :week_percent_change => coin.css('td').css('.percent-7d').text.strip
        }


      # coin = Cryptie::Coin.new(coin_hash) unless coin_hash[:rank] == "#"
      # all << coin_hash unless coin_hash[:rank] == "#" # Eliminates false coin instance
    end

      new_hash_array = coin_hash_array.collect do |hash|
        hash if hash[:rank] != "#"
      end

      new_hash_array.compact
  end

  def self.create_all_coin_instances
    scrape_coins[0..99].each do |coin_hash|
      Crypto.create(name: coin_hash[:name], symbol: coin_hash[:symbol])
    end
  end

  def self.all
    @@all
  end
end
